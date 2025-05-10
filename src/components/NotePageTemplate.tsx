import React from 'react'

type Concept = {
  title: string
  content: string
}

type Props = {
  title: string
  tags: string[]
  reflection: string
  concepts?: Concept[]
  codeLink?: string
}

const NotePageTemplate = ({ title, tags, reflection, concepts = [], codeLink }: Props) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-white font-zen">
      <h1 className="text-3xl font-bold mb-6 text-[#f9f6f1]">{title}</h1>

      <div className="flex flex-wrap gap-2 text-sm mb-6">
        {tags.map((tag, i) => (
          <span key={i} className="bg-white/10 text-[#bfa382] px-3 py-1 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>

      {reflection && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white/90 mb-2">💭 我的心得</h2>
          <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">{reflection}</p>
        </div>
      )}

      {concepts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-white/90 mb-2">📘 知識補充</h2>
          {concepts.map((c, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-md font-semibold text-[#f9f6f1] mb-1">{c.title}</h3>
              <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>
      )}

      {codeLink && (
        <a
          href={codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-[#bfa382] hover:underline"
        >
          🔗 查看原始碼
        </a>
      )}
    </div>
  )
}

export default NotePageTemplate