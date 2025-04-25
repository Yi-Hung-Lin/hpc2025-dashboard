import React, { useState, useEffect, useRef } from 'react'
import { auth } from '../config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
const errorMap: Record<string, string> = {
  'auth/invalid-email': 'Invalid email address.',
  'auth/user-not-found': 'No account found for this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/missing-password': 'Password is required.',
  'auth/missing-email': 'Email is required.',
  'auth/too-many-requests': 'Too many failed attempts. Try again later.',
  'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/internal-error': 'An internal error occurred. Try again.',
  'auth/operation-not-allowed': 'Sign-in method is not enabled.'
}

// 🎯 自訂錯誤訊息轉譯
const getFriendlyError = (code: string) => {
  if (!code) return 'An unknown error occurred.'
  return errorMap[code] || 'An unknown error occurred.'
}

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // 🎯 切換 tab 時清空資料
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
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/chat')
    } catch (err: any) {
      setError(getFriendlyError(err.code || err.message))
      // 小強化：錯誤時 focus 到 password 輸入框
      passwordRef.current?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate('/chat')
    } catch (err: any) {
      setError(getFriendlyError(err.code || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="card w-full max-w-md glass fade-in overflow-hidden">
        <div className="flex justify-center mb-4 gap-6">
          <button
            className={`font-semibold transition ${
              !isRegister ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'
            }`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={`font-semibold transition ${
              isRegister ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'
            }`}
            onClick={() => setIsRegister(true)}
          >
            Sign Up
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isRegister ? 'register' : 'login'}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              disabled={loading}
              className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:border-blue-400 outline-none shadow-sm transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                disabled={loading}
                className="w-full pr-12 rounded-xl px-4 py-2 border border-gray-300 focus:border-blue-400 outline-none shadow-sm transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* 密碼強度提示（只在註冊時顯示） */}
            {isRegister && password.length > 0 && password.length < 6 && (
              <p className="text-yellow-500 text-xs text-center">
                Password should be at least 6 characters.
              </p>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center -mt-2">
                {getFriendlyError(error)}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-2 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isRegister ? 'Sign Up' : 'Login')}
            </button>
          </motion.form>
        </AnimatePresence>

        {/* Google 登入按鈕 */}
        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-300 shadow hover:shadow-md hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle size={20} />
            <span>{loading ? 'Loading...' : 'Sign in with Google'}</span>
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:text-blue-700 hover:scale-105 hover:underline font-semibold transition-all duration-300 transform"
          >
            {isRegister ? 'Login' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginPage