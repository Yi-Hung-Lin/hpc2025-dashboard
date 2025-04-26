import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref as dbRef, onValue, push, set } from 'firebase/database'
import { auth } from '../config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useDynamicBackground } from '../hooks/useDynamicBackground'

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { backgroundElement } = useDynamicBackground()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    setEmail('')
    setPassword('')
    setError('')
  }, [isRegister])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
        navigate('/profile')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/chat')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
  
      // 連接 Database
      const db = getDatabase()
      const userRef = dbRef(db, `users/${user.uid}`)
  
      // 先去看看 Database 裡有沒有這個使用者資料
      onValue(userRef, (snapshot) => {
        if (!snapshot.exists()) {
          // 沒有的話，建立一筆新資料
          set(userRef, {
            nickname: user.displayName || "匿名使用者",
            avatarUrl: user.photoURL || '',
            themeColor: '#bfa382'
          })
        }
      }, { onlyOnce: true })
  
      navigate('/chat')
    } catch (err: any) {
      setError(err.message)
    }
  }
  

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-zen bg-black text-white overflow-hidden">
      {backgroundElement}

      <div className="z-10 bg-black/50 backdrop-blur-md rounded-2xl px-6 py-8 w-full max-w-sm sm:max-w-md space-y-6 shadow-xl">
        {/* Tab 切換 */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsRegister(false)}
            className={`px-4 py-1 rounded-full border ${
              !isRegister
                ? 'bg-[#bfa382] text-white'
                : 'text-[#bfa382] border-[#bfa382]'
            } transition-all duration-300`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`px-4 py-1 rounded-full border ${
              isRegister
                ? 'bg-[#bfa382] text-white'
                : 'text-[#bfa382] border-[#bfa382]'
            } transition-all duration-300`}
          >
            Sign Up
          </button>
        </div>

        {/* 表單區 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl px-4 py-2 sm:px-5 sm:py-3 bg-white/90 text-black placeholder:text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-xl px-4 py-2 sm:px-5 sm:py-3 pr-12 bg-white/90 text-black placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#bfa382] text-white font-bold px-6 py-3 rounded-full shadow hover:scale-105 hover:brightness-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#bfa382]"
          >
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-medium py-2 rounded-full shadow hover:scale-[1.02] hover:brightness-105 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="text-center text-sm text-white/80">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#bfa382] hover:text-white font-semibold transition"
          >
            {isRegister ? 'Login' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginPage