import React from 'react'
import { useDynamicBackground } from '../hooks/useDynamicBackground'

const AboutPage = () => {
  const { backgroundElement } = useDynamicBackground()

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 bg-black text-white font-zen">
      {backgroundElement}

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* 左側文字介紹區 */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
          <div className="relative z-10 bg-black/60 p-6 rounded-xl space-y-6 text-white">
            <h1 className="text-3xl font-bold tracking-wider text-[#f9f6f1]">About Me</h1>

            <p className="text-gray-300 leading-relaxed">
              嗨，我是 Chang0608，目前就讀於清華大學資訊工程學系。
              我喜歡在深夜寫程式，對於能「活起來」的介面特別著迷：像是會回話的聊天室、會打字的首頁、會閃爍的霓虹背景。
              對我來說，程式不只是工具，而是一種溫柔的表達形式。
            </p>

            <p className="text-gray-300 leading-relaxed">
              過去我完成了一個以 Firebase + React 為主的聊天室專案，支援使用者登入、私聊群聊、訊息搜尋、撤回、GIF 傳送、個人主題設定……甚至還打造了一個日系霧氣打字風格的進場畫面。那不只是一個作品，更像是一段能與自己對話的夜晚。
            </p>

            <p className="text-gray-400 leading-relaxed">
              技術上，我熟悉：
            </p>

            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>React / TypeScript / TailwindCSS</li>
              <li>Firebase 全家桶：Auth, Firestore, Hosting, Storage</li>
              <li>Python / C / C++，並有 bitonic sort、OpenACC 平行化、HPC 專題等經驗</li>
              <li>具備測資能力，會寫單元測試、Git 使用熟練</li>
            </ul>

            <p className="text-gray-300 leading-relaxed">
              我曾是台北前三志願高中程式校隊成員，拿過市賽獎項與自主學習佳作。
              進入大學後接觸到更多實戰型專案，也開始打磨出自己對「乾淨程式碼」與「有靈魂介面」的執著。
            </p>

            <p className="text-sm text-gray-500">
              「夜の帳が降りる頃、物語は始まる。」<br />
              我想寫的，從來不只是程式，而是自己的成長日誌。
            </p>
          </div>
        </div>

        {/* 右側形象卡片 */}
        <div className="hidden md:flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-2xl p-6 space-y-4 w-full max-w-sm h-fit shadow-xl animate-fade-in">
          <img
            src="/image/profile-symbolic.png"
            alt="Profile Symbol"
            className="rounded-full w-24 h-24 object-cover shadow-md ring-2 ring-white/20 hover:ring-[#bfa382] transition"
          />
          <p className="text-sm text-gray-300 italic text-center">“靜靜寫程式，也是在認識自己。”</p>
          <div className="w-full border-t border-white/20 pt-2" />
          <div className="flex flex-col items-center gap-2 text-sm text-white">
            <a
              href="https://github.com/Chang0608"
              className="hover:text-[#bfa382] transition"
              target="_blank"
            >
              GitHub
            </a>
            <a
              href="mailto:caillou0608@email.com"
              className="hover:text-[#bfa382] transition"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage