import React from 'react'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { useDynamicBackground } from '../hooks/useDynamicBackground'

const HomePage = () => {
  const navigate = useNavigate()
  const { backgroundElement } = useDynamicBackground()

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-zen text-white">
      {/* 背景圖片層 */}
      {backgroundElement}

      {/* 主要卡片內容 */}
      <div className="z-10 bg-black/50 backdrop-blur-md px-12 py-10 rounded-2xl max-w-3xl w-full text-center shadow-xl space-y-6 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wider leading-relaxed text-white whitespace-nowrap">
        <Typewriter
            options={{
                strings: ['夜の帳が降りる頃、物語は始まる。'],
                autoStart: true,
                loop: false,
                delay: 60,
                deleteSpeed: 30,
            }}
            onInit={(typewriter) => {
                typewriter
                .start()
                .typeString('夜の帳が降りる頃、物語は始まる。')
            }}
            />
        </h1>
        <p className="text-gray-300 text-sm sm:text-base tracking-wide">
          As dusk falls, the story begins.
        </p>

        <button
          onClick={() => navigate('/login')}
          className="btn-primary px-6 py-2"
        >
          はじめる
        </button>
      </div>
    </div>
  )
}

export default HomePage