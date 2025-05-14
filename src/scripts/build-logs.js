const fs = require('fs')
const path = require('path')
const LOGS_DIR = path.resolve(__dirname, '../../logs')
const OUTPUT_FILE = path.resolve(__dirname, '../../src/data/logs-data.ts')

function extractLatestSummary(content) {
  const dayMatch = content.match(/##\s+\[(Day[^\]]+)\]/)
  const dayLabel = dayMatch ? dayMatch[1] : ''

  const lines = content.split(/\r?\n/)
  const taskLine = lines.find((l) => /任務紀錄/.test(l))
  const idx = lines.indexOf(taskLine)

  let latestTask = ''
  for (let i = idx + 1; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (/^(#|##|---)/.test(trimmed)) break
    if (trimmed.length > 0) {
      latestTask = trimmed.replace(/^[-\s>*]+/, '')
      break
    }
  }

  return dayLabel && latestTask ? `${dayLabel}：${latestTask}` : latestTask || '尚無紀錄'
}

function generateLogData() {
  const files = fs.readdirSync(LOGS_DIR).filter((f) => f.endsWith('.md'))
  const result = files.map((filename) => {
    const filepath = path.join(LOGS_DIR, filename)
    const content = fs.readFileSync(filepath, 'utf-8')
    const name = content.match(/^#\s+(.*)/)?.[1] || filename.replace('.md', '')
    const title = content.match(/title:\s+(.*)/)?.[1] || '未指定任務'
    const lastUpdated = fs.statSync(filepath).mtime.toISOString()
    const progressCount = (content.match(/##\s+\[Day/g) || []).length

    const latest = extractLatestSummary(content)

    return {
      id: filename.replace('.md', ''),
      name,
      title,
      github: '',
      progress: {
        solved: progressCount,
        total: 7,
      },
      latest,
      lastUpdated,
      fullText: content
    }
  })

  const output = `export const logs = ${JSON.stringify(result, null, 2)}\n`
  fs.writeFileSync(OUTPUT_FILE, output)
  console.log(`✅ logs-data.ts generated with ${result.length} entries.`)
}

generateLogData()
