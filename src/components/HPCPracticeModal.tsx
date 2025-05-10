import React from 'react'

const HPCPracticeModal = ({ open, onClose, title, tech, tags, description, reflection, codeLink, resultImage }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-black/90 text-white p-6 rounded-2xl w-full max-w-2xl shadow-xl relative animate-fade-in space-y-6 overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow">
            <img src={`/icons/${tech.toLowerCase()}.png`} alt={tech} className="w-6 h-6 object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-[#f9f6f1]">{title}</h2>
        </div>

        <p className="text-sm text-gray-300">{description}</p>

        {resultImage && (
          <img
            src={resultImage}
            alt="Result Preview"
            className="w-full rounded-lg border border-white/10"
          />
        )}

        {reflection && (
          <div>
            <h3 className="text-lg font-semibold text-white/90 mb-1">💭 Reflection</h3>
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{reflection}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-sm text-[#bfa382]">
          {tags.map((tag, i) => (
            <span key={i} className="bg-white/10 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-[#bfa382] hover:underline"
        >
          🔗 View Code
        </a>
      </div>
    </div>
  )
}

export default HPCPracticeModal
