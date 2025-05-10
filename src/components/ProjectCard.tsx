import React from 'react'
import { useDynamicBackground } from '../hooks/useDynamicBackground'
import MiniProgressBar from '../components/MiniProgressBar'

const ProjectCard = ({
  title,
  description,
  tags,
  link,
  repo,
  progress, // 加這個
}: {
  title: string
  description: string
  tags: string[]
  link: string
  repo: string
  progress?: { solved: number; total: number }
}) => {
  const { backgroundElement } = useDynamicBackground()
  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow hover:shadow-lg transition space-y-4">
      <div className="flex justify-between items-center gap-4">
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
      <div className="pt-3 flex gap-4">
        {link && (
          <a href={link} target="_blank" className="text-white hover:underline text-sm">
            🔗 View
          </a>
        )}
        {repo && (
          <a href={repo} target="_blank" className="text-white hover:underline text-sm">
            💾 GitHub
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard