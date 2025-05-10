'use client'

import { useState } from 'react'
import { GithubIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface LogCardProps {
  title: string
  description: string
  tags: string[]
  link?: string
  repo?: string
  progress?: {
    solved: number
    total: number
  }
  fullLog?: {
    day: string
    lines: (
      | { type: 'text'; content: string }
      | { type: 'image'; src: string }
    )[]
  }[]
  lastUpdated?: string
}

export default function LogCard({
  title,
  description,
  tags,
  link,
  repo,
  progress,
  fullLog = [],
  lastUpdated
}: LogCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl cursor-pointer transition-all relative"
        onClick={() => setIsOpen(true)}
      >
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="w-5 h-5 text-white hover:text-gray-300" />
              </a>
            )}
          </div>
          <p className="text-white text-sm line-clamp-2 min-h-[40px]">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs text-white bg-white/10 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          {progress && (
            <>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-[#bfa382] transition-all duration-500"
                  style={{ width: `${Math.round((progress.solved / progress.total) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-white text-right mt-1">
                {progress.solved} / {progress.total} days logged
              </p>
            </>
          )}
        </div>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white/10 p-6 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto text-white backdrop-blur-md border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#bfa382]">{title}'s Log</h3>
              <button onClick={() => setIsOpen(false)} className="hover:underline text-sm text-white">
                Close
              </button>
            </div>
            {fullLog.map((entry, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-semibold text-sm mb-1 text-white">🕒 {entry.day}</h4>
                <ul className="space-y-2">
                  {entry.lines.map((line, i) => {
                    if (typeof line === 'string') {
                      return <li key={i}>{line}</li>
                    }
                    if (line.type === 'text') {
                      return <li key={i}>{line.content}</li>
                    }
                    if (line.type === 'image') {
                      return (
                        <div key={i} className="my-2">
                          <img src={line.src} alt="" className="rounded-lg max-w-full mx-auto" />
                        </div>
                      )
                    }
                    return null
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
