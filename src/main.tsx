import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/main.css'
import { BackgroundProvider } from './hooks/useDynamicBackground'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BackgroundProvider>
      <App />
    </BackgroundProvider>
  </React.StrictMode>,
)