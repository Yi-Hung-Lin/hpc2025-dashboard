import React, { useState } from 'react'
import { auth } from '../config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/chat')
    } catch (err: any) {
      setError(err.message)
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
              type="email"
              placeholder="Email"
              className="w-full rounded-xl px-4 py-2 border border-gray-300 focus:border-blue-400 outline-none shadow-sm transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="btn-primary mt-2 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              {isRegister ? 'Sign Up' : 'Login'}
            </button>
          </motion.form>
        </AnimatePresence>

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