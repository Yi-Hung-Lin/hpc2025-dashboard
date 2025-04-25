import React from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-zen text-white">
      {/* 背景圖片層 */}
      <div className="absolute inset-0 bg-[url('/image/ginza-night.jpg')] bg-cover bg-center opacity-20 pointer-events-none z-0" />

      {/* 卡片內容 */}
      <div className="z-10 bg-black/50 backdrop-blur-md p-10 rounded-2xl max-w-md text-center shadow-xl">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wider">
            夜のチャット
        </h1>
        <p className="text-gray-300 text-sm mb-2">夜裡的話語，從這裡開始。</p>
        <p className="text-gray-400 text-sm mb-8">Speak freely, in a place that listens.</p>

        <button
          onClick={() => navigate('/login')}
          className="bg-[#bfa382] text-white font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 hover:brightness-110 transform transition-all duration-300"
        >
            はじめる
        </button>
      </div>
    </div>
  )
}

export default WelcomePage