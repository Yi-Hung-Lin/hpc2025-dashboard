import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './config'

import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectPage'
import HPCPage from './pages/HPCPage'
import NavBar from './components/NavBar'
import NotesIndex from './notes/index'
import MpiNoteListPage from './notes/mpi'

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
        <Route path="/hpc2025-dashboard/" element={<HomePage />} />
        <Route path="/hpc2025-dashboard/projects" element={<ProjectsPage />} />
        <Route path="/hpc2025-dashboard/hpc" element={<HPCPage />} />
        <Route path="/hpc2025-dashboard/notes" element={<NotesIndex />} />
        <Route path="/hpc2025-dashboard/notes/mpi" element={<MpiNoteListPage />} />
      </Routes>
    </Router>
  )
}

export default App