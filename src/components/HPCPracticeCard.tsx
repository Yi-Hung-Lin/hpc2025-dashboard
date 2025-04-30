import React from 'react'

const HPCPracticeCard = ({ title, tech, tags, description, codeLink }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow hover:shadow-lg transition space-y-4">
      {/* 技術圖示 + 標題 */}
      <div className="flex items-center gap-3">
        <img
          src={`/icons/${tech.toLowerCase()}.svg`}
          alt={tech}
          className="w-6 h-6"
        />
        <h2 className="text-xl font-bold text-white">{title}</h2>
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