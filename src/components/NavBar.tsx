import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()

  const navItems = [
    { name: '首頁', path: '/hpc2025-dashboard/' },
    { name: '作品集', path: '/hpc2025-dashboard/projects' },
  ]

  return (
    <nav className="fixed top-0 left-0 z-50 w-full transition-all duration-300 opacity-0 -translate-y-6 hover:opacity-100 hover:translate-y-0 bg-black/40 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center text-white">
        <div className="font-bold text-lg tracking-wide">夜の技術帖</div>
        <ul className="flex space-x-4 text-sm sm:text-base font-zen">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-3 py-1 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-[#bfa382] text-white'
                    : 'hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar