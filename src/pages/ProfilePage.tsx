import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref as dbRef, set, onValue } from 'firebase/database'
import { auth } from '../config'
import { useNavigate } from 'react-router-dom'
import { useDynamicBackground } from '../hooks/useDynamicBackground'

const ProfilePage = () => {
    const [nickname, setNickname] = useState('')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const CLOUD_NAME = 'dhtqetylj'
    const UPLOAD_PRESET = 'Chatroom_Avatars'
    const user = auth.currentUser
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { backgroundElement } = useDynamicBackground()
  
    useEffect(() => {
        if (!user) {
          navigate('/login')
          return
        }
    
        const db = getDatabase()
        const profileRef = dbRef(db, `users/${user.uid}`)
    
        onValue(profileRef, (snapshot) => {
          const data = snapshot.val()
          if (data) {
            setNickname(data.nickname || '')
            setAvatarPreview(data.avatarUrl || '')
          }
          setLoading(false)
        })
      }, [user, navigate])
    
      async function uploadAvatar(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', UPLOAD_PRESET)
        formData.append('folder', 'avatars')
    
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        })
    
        const data = await res.json()
        return data.secure_url
      }
    
      const handleSave = async () => {
        if (!user) return
        const db = getDatabase()
        const profileRef = dbRef(db, `users/${user.uid}`)
    
        let avatarUrl = avatarPreview
    
        if (avatarFile) {
          avatarUrl = await uploadAvatar(avatarFile)
        }
    
        await set(profileRef, {
          nickname: nickname,
          avatarUrl: avatarUrl
        })
    
        navigate('/chat')
      }
    
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          setAvatarFile(file)
          setAvatarPreview(URL.createObjectURL(file))
        }
      }
    
      if (loading) {
        return <div className="text-white flex justify-center items-center min-h-screen">Loading Profile...</div>
      }
    
      return (
        <div className="relative min-h-screen w-full flex items-center justify-center font-zen bg-black text-white p-4">
          {backgroundElement}
          <div className="z-10 bg-black/50 backdrop-blur-md rounded-2xl px-6 py-8 w-full max-w-sm sm:max-w-md space-y-6 shadow-xl flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 text-center text-white">Update Your Profile</h1>
    
            {/* 頭像區塊 */}
            <div className="relative">
              <img
                src={avatarPreview || '/image/default-avatar.jpg'} // 這邊可以換成你自己的預設圖
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-white cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
    
            {/* 暱稱輸入 */}
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              className="rounded-xl px-4 py-2 text-black w-full bg-white/90 placeholder-gray-500"
            />
    
            {/* 儲存按鈕 */}
            <button
              onClick={handleSave}
              className="w-full bg-[#bfa382] text-white font-bold px-6 py-3 rounded-full hover:scale-105 hover:brightness-110 transition"
            >
              Save
            </button>
          </div>
        </div>
      )
}

export default ProfilePage