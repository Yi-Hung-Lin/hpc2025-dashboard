import React from 'react'
import { useDynamicBackground } from '../hooks/useDynamicBackground'
import HPCPracticeCard from '../components/HPCPracticeCard'

const HPCPage = () => {
  const { backgroundElement } = useDynamicBackground()

  const practices = [
    {
      title: 'Sobel Filter',
      tech: 'CUDA',
      tags: ['CUDA', 'Shared Memory', 'Edge Detection'],
      description: 'Use shared memory to optimize image edge detection using a 5x5 Sobel kernel.',
      codeLink: 'https://github.com/chang0608/hpc-practice-log/tree/main/cuda/sobel',
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
      title: 'Ring Communication',
      tech: 'MPI',
      tags: ['MPI', 'Point-to-Point', 'Topology'],
      description: 'Simulate ring topology message passing using point-to-point MPI send/recv.',
      codeLink: 'https://github.com/chang0608/hpc-practice-log/tree/main/mpi/ring-comm',
    },
  ]

  return (
    <div className="relative min-h-screen w-full px-4 py-12 bg-black text-white font-zen">
      {backgroundElement}

      <div className="z-10 relative max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#f9f6f1]">HPC 練習紀錄</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {practices.map((p, i) => (
            <HPCPracticeCard key={i} {...p} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HPCPage