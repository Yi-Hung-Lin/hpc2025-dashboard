import React from 'react'
import { mpiTopics } from '../data/mpi'
import { Link } from 'react-router-dom'

const NotesIndex = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-white font-zen">
      <h1 className="text-3xl font-bold mb-8 text-[#f9f6f1]">技術筆記總覽</h1>

      {mpiTopics.map((topic) => (
        <div key={topic.id} className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-[#f9f6f1]">{topic.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topic.exercises.map((ex) => (
              <Link
                to={ex.path}
                key={ex.id}
                className="block bg-white/5 p-4 rounded-xl backdrop-blur-md shadow hover:shadow-lg hover:bg-white/10 transition"
              >
                <h3 className="text-md font-bold text-[#f9f6f1] mb-1">{ex.title}</h3>
                <div className="flex flex-wrap gap-2 text-xs text-[#bfa382]">
                  {ex.tags.map((tag, i) => (
                    <span key={i} className="bg-white/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotesIndex
