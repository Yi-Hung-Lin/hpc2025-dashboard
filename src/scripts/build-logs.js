const fs = require('fs')
const path = require('path')
const LOGS_DIR = path.resolve(__dirname, '../../logs')
const OUTPUT_FILE = path.resolve(__dirname, '../../src/data/logs-data.ts')

function parseLogFile(content) {
  const sections = content.split(/##\s+(Day\s+\d+)/).slice(1)
  const logs = []
  for (let i = 0; i < sections.length; i += 2) {
    const day = sections[i].trim()
    const lines = sections[i + 1]
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((l) => {
        if (l.startsWith('![') || l.startsWith('!(')) {
          const match = l.match(/\((.*?)\)/)
          return { type: 'image', src: match?.[1] || '' }
        } else if (l.startsWith('-')) {
          return { type: 'text', content: l.replace(/^[-\s]+/, '') }
        } else {
          return { type: 'text', content: l }
        }
      })
    logs.push({ day, lines })
  }
  return logs
}

function generateLogData() {
  const files = fs.readdirSync(LOGS_DIR).filter((f) => f.endsWith('.md'))
  const result = files.map((filename) => {
    const filepath = path.join(LOGS_DIR, filename)
    const content = fs.readFileSync(filepath, 'utf-8')
    const fullLog = parseLogFile(content)
    const latestEntry = fullLog[fullLog.length - 1]?.lines?.find(l => l.type === 'text')
    const latest = latestEntry?.content || '尚無紀錄'
    const name = content.match(/^#\s+(.*)/)?.[1] || filename.replace('.md', '')
    const title = content.match(/title:\s+(.*)/)?.[1] || '未指定任務'
    const lastUpdated = fs.statSync(filepath).mtime.toISOString()

    return {
      id: filename.replace('.md', ''),
      name,
      title,
      github: '',
      progress: {
        solved: fullLog.length,
        total: 7,
      },
      latest,
      lastUpdated,
      fullLog,
    }
  })

  const output = `export const logs = ${JSON.stringify(result, null, 2)}\n`
  fs.writeFileSync(OUTPUT_FILE, output)
  console.log(`✅ logs-data.ts generated with ${result.length} entries.`)
}

generateLogData()
