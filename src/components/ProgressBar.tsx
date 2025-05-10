import React from 'react'

const ProgressBar = ({ title, solved, total }) => {
  const percentage = Math.round((solved / total) * 100)

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-xl overflow-hidden shadow-lg">
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
        <div className="w-full bg-black/30 h-4 rounded-full overflow-hidden">
          <div
            className="bg-[#bfa382] h-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          已完成 <span className="font-bold text-white">{solved}</span> / {total} 題
          <span className="ml-2 text-[#bfa382]">({percentage}%)</span>
        </p>
      </div>
    </div>
  )
}

export default ProgressBar