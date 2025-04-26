import React, { createContext, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const backgrounds = [
  '/image/ginza-night.jpg',
  '/image/izakaya.jpg',
  '/image/city-night.jpg',
  '/image/alley.jpg'
]

const intervalMs = 60000 // 每張背景顯示時間（1分鐘）

const BackgroundContext = createContext({ currentIndex: 0 })

export const BackgroundProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [])

  return (
    <BackgroundContext.Provider value={{ currentIndex }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export const useDynamicBackground = () => {
  const { currentIndex } = useContext(BackgroundContext)

  const backgroundElement = (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.2, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />
    </AnimatePresence>
  )

  return { backgroundElement, currentIndex, imageUrl: backgrounds[currentIndex] }
}