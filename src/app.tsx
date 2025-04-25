import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'

function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<div>Chatroom Page (coming soon!)</div>} />
          </Routes>
        </BrowserRouter>
      )
}

export default App