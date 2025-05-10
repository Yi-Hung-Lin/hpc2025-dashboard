import React from 'react'

type Props = {
  solved: number
  total: number
}

const MiniProgressBar = ({ solved, total }: Props) => {
  const percent = Math.round((solved / total) * 100)

  return (
    <div
      className="w-24 h-2 rounded-full bg-white/10 overflow-hidden shadow-inner"
      title={`完成 ${solved} / ${total} 題（${percent}%）`}
    >
      <div
        className="h-full bg-[#bfa382] transition-all duration-300"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  )
}

export default MiniProgressBar