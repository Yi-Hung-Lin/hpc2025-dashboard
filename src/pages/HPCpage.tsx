import React, { useState } from 'react'
import { useDynamicBackground} from '../hooks/useDynamicBackground'
import HPCPracticeCard from '../components/HPCPracticeCard'
import HPCPracticeModal from '../components/HPCPracticeModal'

type HPCPractice = {
  title: string
  tech: string
  tags: string[]
  description: string
  codeLink: string
  reflection?: string
  resultImage?: string
}

const HPCPage = () => {
  const { backgroundElement } = useDynamicBackground()
  const [modalData, setModalData] = useState<HPCPractice | null>(null)

  const practices = [
    {
      title: 'Sobel Filter',
      tech: 'CUDA',
      tags: ['CUDA', 'Shared Memory', 'Edge Detection'],
      description: 'Use shared memory to optimize image edge detection using a 5x5 Sobel kernel.',
      codeLink: 'https://github.com/chang0608/hpc-practice-log/tree/main/cuda/sobel',
      reflection: `這次是我第一次實際上手優化 CUDA 程式，整體走過從 host 傳資料到 device、啟動 kernel、再把資料從 device 傳回 host 的完整流程，讓我對 CUDA 的標準作業順序更加熟悉。

      其中一個收穫是學會如何將不變的 Sobel mask 資料使用 __constant__ 宣告，這樣能夠將其存在 constant memory 中，讓所有 threads 以快取方式存取，減少 global memory 存取開銷。

      這次也遇到幾個明確的錯誤與調整：
      - 一開始 kernel 啟動時，誤把 gridDim 和 blockDim 寫反
      - 邊界處理沒考慮周全，導致輸出圖像邊緣異常
      - 嘗試使用 shared memory 作為鄰近資料暫存，有效減少了重複讀取`,
    resultImage: '/images/sobel-output.png'
    },
    {
      title: 'Bitonic Sort',
      tech: 'MPI',
      tags: ['MPI', 'Scatter', 'Parallel Sort'],
      description: 'Parallel sort using MPI scatter/gather with compare-exchange logic.',
      codeLink: 'https://github.com/chang0608/hpc-practice-log/tree/main/mpi/bitonic-sort',
    },
    {
      title: 'MNIST Inference',
      tech: 'OpenACC',
      tags: ['OpenACC', 'Neural Network', 'GPU'],
      description: 'Accelerated MNIST digit classification using OpenACC for dense layer ops.',
      codeLink: 'https://github.com/chang0608/hpc-practice-log/tree/main/openacc/mnist-inference',
    },
    {
      title: 'MPI Exercises',
      tech: 'MPI',
      tags: ['MPI', 'Point-to-Point', 'Collective', 'Topology'],
      description: 'Practice real MPI examples from ANL’s tutorial: Ring, Pi, PingPong and more — all tested and documented by me.',
      codeLink: '/notes/mpi',
      progress: {solved: 4, total: 22}
    },
  ]

  return (
    <div className="relative min-h-screen w-full px-4 py-12 bg-black text-white font-zen">
      {backgroundElement}

      <div className="z-10 relative max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#f9f6f1]">HPC 練習紀錄</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {practices.map((p, i) => (
            <HPCPracticeCard key={i} {...p} onClick={() => setModalData(p)}/>
          ))}
          {modalData && (
            <HPCPracticeModal
            open={true}
            onClose={() => setModalData(null)}
            title={modalData.title}
            tech={modalData.tech}
            tags={modalData.tags}
            description={modalData.description}
            codeLink={modalData.codeLink}
            reflection={modalData.reflection}
            resultImage={modalData.resultImage}
          />
          )}
        </div>
      </div>
    </div>
  )
}

export default HPCPage