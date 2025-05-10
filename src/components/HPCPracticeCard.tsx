import React from 'react'
import MiniProgressBar from '../components/MiniProgressBar'

const HPCPracticeCard = ({
  title,
  tech,
  tags,
  description,
  codeLink,
  onClick,// 接收 onClick prop
  progress, 
}: {
  title: string
  tech: string
  tags: string[]
  description: string
  codeLink: string
  reflection?: string
  resultImage?: string
  onClick?: () => void // 加這一行型別定義
  progress?: { solved: number; total: number }
}) => {
  return (
    <div  
      onClick={onClick}
      className="cursor-pointer bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow hover:shadow-lg transition space-y-4">
      {/* 技術圖示 + 標題 */}
      <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-md">
          <img
            src={`/icons/${tech.toLowerCase()}.png`}
            alt={tech}
            className="w-6 h-6 object-contain"
          />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {typeof progress === 'object' && (
          <MiniProgressBar solved={progress.solved} total={progress.total} />
        )}
      </div>

      <p className="text-sm text-gray-300">{description}</p>

      <div className="flex flex-wrap gap-2 text-xs text-[#bfa382]">
        {tags.map((tag, i) => (
          <span key={i} className="bg-white/10 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-2">
        <a
          href={codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white hover:underline"
        >
          🔗 View Code
        </a>
      </div>
    </div>
  )
}

export default HPCPracticeCard