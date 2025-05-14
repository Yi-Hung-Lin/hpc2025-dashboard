'use client'

import { useState } from 'react'
import { GithubIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

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
  fullText?: string
  lastUpdated?: string
}

export default function LogCard({
  title,
  description,
  tags,
  link,
  repo,
  progress,
  fullText = '',
  lastUpdated
}: LogCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const cleanedText = fullText
  .split(/\r?\n/)
  .filter(line => !/^title:\s+/i.test(line.trim()))
  .join('\n')

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
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white bg-opacity-10 border border-white/20 rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#bfa382]">{title}'s Log</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-sm hover:underline"
              >
                Close
              </button>
            </div>
            <div className="prose prose-invert max-w-none leading-relaxed [&_h1]:text-white [&_h2]:text-[#bfa382] [&_h3]:text-white [&_h1:first-child]:hidden">
              <ReactMarkdown>{cleanedText}</ReactMarkdown>
            </div>
            <div className="text-xs text-right text-white/50 mt-6">
              Last updated: {lastUpdated || 'N/A'}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
