import React from 'react'
import { useDynamicBackground } from '../hooks/useDynamicBackground'

const ProjectCard = ({ title, description, tags, link, repo }) => {
  const { backgroundElement } = useDynamicBackground()
  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow hover:shadow-lg transition space-y-4">
      { backgroundElement }
      <h2 className="text-xl font-bold text-white">{title}</h2>
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