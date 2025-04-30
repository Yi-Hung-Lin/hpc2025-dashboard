import React from 'react'
import { useDynamicBackground } from '../hooks/useDynamicBackground'
import ProjectCard from '../components/ProjectCard'

const ProjectsPage = () => {
  const { backgroundElement } = useDynamicBackground()

  const projects = [
    {
      title: 'Chatroom 系統',
      description: '支援登入、私聊、GIF 傳送與群組管理的聊天室，採用 Firebase 與 React 技術實作。',
      tags: ['React', 'Firebase', 'Tailwind'],
      link: 'https://chang0608.github.io/chatroom',
      repo: 'https://github.com/chang0608/chatroom'
    },
    {
      title: 'CSES Marathon',
      description: '紀錄我刷完 CSES 問題集的過程與筆記，附有原始碼與解題說明。',
      tags: ['C++', 'Algorithm', 'Competitive'],
      link: '',
      repo: 'https://github.com/chang0608/cses-marathon'
    },
    {
      title: 'HPC 練習記錄',
      description: '整理 MPI、CUDA、OpenACC 等高效能計算實驗與心得，卡片式展示，支援 Modal 展開。',
      tags: ['MPI', 'CUDA', 'OpenACC'],
      link: '/hpc',
      repo: 'https://github.com/chang0608/hpc-practice-log'
    }
  ]

  return (
    <div className="relative min-h-screen w-full px-4 py-12 bg-black text-white font-zen">
      {backgroundElement}

      <div className="z-10 relative max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#f9f6f1]">Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage