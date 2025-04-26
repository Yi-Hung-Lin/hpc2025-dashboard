import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './config'

// 頁面元件匯入（請確認路徑正確）
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import ChatroomPage from './pages/ChatroomPage'
import ProfilePage from './pages/ProfilePage' // 如果還沒做可以先註解

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
      <Routes>
        <Route path="/" element={user ? <Navigate to="/chat" /> : <WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={user ? <ChatroomPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App