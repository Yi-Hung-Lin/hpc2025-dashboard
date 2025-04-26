import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import ChatroomPage from './pages/ChatroomPage'

function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatroomPage />} />
          </Routes>
        </BrowserRouter>
      )
}

export default App