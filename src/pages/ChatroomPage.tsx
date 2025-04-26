import React, { useState, useRef, useEffect } from 'react'
import { useDynamicBackground } from '../hooks/useDynamicBackground'
import { auth } from '../config'
import { signOut } from 'firebase/auth'
import { getDatabase, ref, push, onChildAdded, set, onValue } from 'firebase/database'
import { useNavigate } from 'react-router-dom'

type Message = {
  id: string
  text: string
  sender: 'me' | 'other'
}

const ChatroomPage = () => {
  const { backgroundElement } = useDynamicBackground()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [themeColor, setThemeColor] = useState('#bfa382') // 預設你的 Forest Brown
  const goToProfile = () => {
    navigate('/profile')
  }
  const user = auth.currentUser
  const db = getDatabase()

  // 監聽 Firebase 上的訊息
  useEffect(() => {
    const messagesRef = ref(db, 'messages')
    onChildAdded(messagesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setMessages((prev) => [...prev, {
          id: snapshot.key || Date.now().toString(),
          text: data.text,
          sender: data.sender
        }])
      }
    })
    if(!user){
        navigate('/login')
        return
    }
    const profileRef = ref(db, `users/${user.uid}`)
    onValue(profileRef, (snapshot) => {
        const data = snapshot.val()
        if (data && data.themeColor) {
        setThemeColor(data.themeColor)
        }
    })
  }, [])

  // 自動滾動到底
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return
  
    const user = auth.currentUser
    if (!user) {
      alert('請先登入！')
      navigate('/login')
      return
    }
  
    const messagesRef = ref(db, 'messages')
    await push(messagesRef, {
      text: input,
      sender: user.uid // ✅ 改成真正的使用者 ID
    })
  
    setInput('')
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col font-zen bg-black text-white overflow-hidden">
      {backgroundElement}

      {/* Header */}
      <div className="z-10 flex justify-between items-center p-4 bg-black/50 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-bold" text-white>夜のチャット</h1>
        <button
            onClick={goToProfile}
            className="text-[#bfa382] hover:text-white font-semibold transition"
            style={{ backgroundColor: themeColor }}
            >
            Profile
        </button>
        <button
          onClick={handleLogout}
          className="text-[#bfa382] hover:text-white font-semibold transition"
          style={{ backgroundColor: themeColor }}
        >
          Logout
        </button>
      </div>

      {/* Message List */}
      <div className="z-10 flex-1 overflow-y-auto flex flex-col gap-4 p-4">
        {messages.map((msg) => {
        const isMe = msg.sender === auth.currentUser?.uid

        return (
            <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
                <div 
                    className={`${isMe ? ' text-white' : 'text-black'} p-3 rounded-2xl max-w-xs break-words`} 
                    style={{ backgroundColor: isMe ? themeColor : '#d1d5db' }}
                >
                {msg.text}
                </div>
            </div>
        )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="z-10 flex items-center gap-2 p-4 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-full bg-white/90 text-black px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bfa382]"
        />
        <button
          type="submit"
          className="bg-[#bfa382] text-white font-bold px-6 py-2 rounded-full hover:scale-105 hover:brightness-110 transition"
          style={{ backgroundColor: themeColor }}
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatroomPage