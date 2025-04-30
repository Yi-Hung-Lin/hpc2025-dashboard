import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './config'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ChatroomPage from './pages/ChatroomPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectPage'
import HPCPage from './pages/HPCpage'
import NavBar from './components/NavBar'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div className="text-white flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <Router>
      {/* 導覽列固定在最外層 */}
      <NavBar />

      {/* 路由管理 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/chat" /> : <LoginPage />} />
        <Route path="/chat" element={user ? <ChatroomPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/hpc" element={<HPCPage />} />
      </Routes>
    </Router>
  )
}

export default App