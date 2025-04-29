import React, { useState, useEffect, useRef } from 'react'
import { getDatabase, ref as dbRef, onValue, push, set } from 'firebase/database'
import { auth } from '../config'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useDynamicBackground } from '../hooks/useDynamicBackground'

function sanitizeInput(input: string) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const CLOUD_NAME = 'dhtqetylj'
const UPLOAD_PRESET = 'Chatroom_Avatars'
const generateRoomId = (uid1: string, uid2: string) => [uid1, uid2].sort().join('_')

const ChatroomPage = () => {
  const [searchText, setSearchText] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [friends, setFriends] = useState<any[]>([])
  const [groups, setGroups] = useState<any[]>([])
  const [currentRoom, setCurrentRoom] = useState('public')
  const [currentGroupId, setCurrentGroupId] = useState('')
  const [nickname, setNickname] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [themeColor, setThemeColor] = useState('#bfa382')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const navigate = useNavigate()
  const { backgroundElement } = useDynamicBackground()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [myFriends, setMyFriends] = useState<string[]>([])
  const [showGifModal, setShowGifModal] = useState(false)
  const [gifResults, setGifResults] = useState<any[]>([])
  const [gifSearch, setGifSearch] = useState("")

  const user = auth.currentUser

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50) // 稍微延遲 50 毫秒
  
    return () => clearTimeout(timer)
  }, [messages])

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
        setAvatarUrl(data.avatarUrl || '')
        setThemeColor(data.themeColor || '#bfa382')
      }
    })

    const usersRef = dbRef(db, 'users')
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const friendsList = Object.entries(data)
          .filter(([uid]) => uid !== user.uid)
          .map(([uid, info]: any) => ({ uid, nickname: info.nickname, avatarUrl: info.avatarUrl }))
        setFriends(friendsList)
      }
    })

    const groupsRef = dbRef(db, 'groups')
    onValue(groupsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const groupList = Object.entries(data).map(([groupId, groupInfo]: any) => ({
          id: groupId,
          name: groupInfo.name,
          members: groupInfo.members
        }))
        setGroups(groupList)
      }
    })
  }, [user, navigate])

  useEffect(() => {
    const db = getDatabase()
    if (!user) return

    let msgRef

    if (currentRoom === 'public') {
      msgRef = dbRef(db, 'messages/public')
    } else if (currentGroupId) {
      msgRef = dbRef(db, `messages/groups/${currentGroupId}`)
    } else {
      const roomId = generateRoomId(user.uid, currentRoom)
      msgRef = dbRef(db, `messages/private/${roomId}`)
    }

    onValue(msgRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const msgArray = Object.entries(data).map(([id, value]: any) => ({ id, ...value }))
        setMessages(msgArray)
      } else {
        setMessages([])
      }
    })
  }, [currentRoom, currentGroupId])

  useEffect(() => {
    if (!user) return
    const db = getDatabase()
    const friendsRef = dbRef(db, `users/${user.uid}/friends`)
    onValue(friendsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setMyFriends(Object.keys(data))
      } else {
        setMyFriends([])
      }
    })
  }, [user])

  const handleSend = async () => {
    if (!newMessage.trim()) return
    const db = getDatabase()
    if (!user) return
  
    const timestamp = Date.now()
    const msg = { text: sanitizeInput(newMessage), sender: user.uid, nickname, avatarUrl, timestamp }
  
    let msgRef
  
    if (currentRoom === 'public') {
      msgRef = dbRef(db, 'messages/public')
    } else if (currentGroupId) {
      msgRef = dbRef(db, `messages/groups/${currentGroupId}`)
    } else {
      const roomId = generateRoomId(user.uid, currentRoom)
      msgRef = dbRef(db, `messages/private/${roomId}`)
    }
  
    const newMsgRef = push(msgRef)
    await set(newMsgRef, msg)
    setNewMessage('')
  
    // 溫柔提示通知
    if (Notification.permission === "granted" && user) {
      new Notification("夜のチャット 🌙", {
        body: `你送出了一條溫柔的訊息 ✉️`,
        icon: avatarUrl || '/image/default-avatar.jpg'
      })
    }
  }
  
  const fetchGifs = async (keyword: string) => {
    const API_KEY = "LIVDSRZULELA" // Tenor 免費公開 API Key
    const url = `https://g.tenor.com/v1/search?q=${keyword}&key=${API_KEY}&limit=20`
    const response = await fetch(url)
    const data = await response.json()
    setGifResults(data.results || [])
  }

  const handleUnsendWithAnimation = (msgId: string) => {
    const bubble = document.getElementById(`msg-${msgId}`)
    if (!bubble) return
  
    bubble.classList.add('animate-shatter')
  
    setTimeout(() => {
      handleUnsend(msgId)
    }, 500)
  }
  
  const handleUnsend = async (msgId: string) => {
    if (!user) return
  
    const db = getDatabase()
    let msgRef
  
    if (currentRoom === 'public') {
      msgRef = dbRef(db, `messages/public/${msgId}`)
    } else if (currentGroupId) {
      msgRef = dbRef(db, `messages/groups/${currentGroupId}/${msgId}`)
    } else {
      const roomId = generateRoomId(user.uid, currentRoom)
      msgRef = dbRef(db, `messages/private/${roomId}/${msgId}`)
    }
  
    await set(msgRef, null)
  }

  const handleSendGif = async (gifUrl: string) => {
    if (!user) return
  
    const db = getDatabase()
    const timestamp = Date.now()
    const msg = {
      text: "",       // 仍然保持一致
      gifUrl: gifUrl, // 新增一個 gifUrl 欄位
      sender: user.uid,
      nickname,
      avatarUrl,
      timestamp
    }
  
    let msgRef
    if (currentRoom === 'public') {
      msgRef = dbRef(db, 'messages/public')
    } else if (currentGroupId) {
      msgRef = dbRef(db, `messages/groups/${currentGroupId}`)
    } else {
      const roomId = generateRoomId(user.uid, currentRoom)
      msgRef = dbRef(db, `messages/private/${roomId}`)
    }
  
    const newMsgRef = push(msgRef)
    await set(newMsgRef, msg)
  
    setShowGifModal(false) // 送完自動關 modal
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
  
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('folder', 'chat-images')
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
  
      const db = getDatabase()
      const timestamp = Date.now()
      const msg = {
        text: "",                   // 這裡不給文字
        imageUrl: data.secure_url,   // 新增一個 imageUrl 欄位
        sender: user.uid,
        nickname,
        avatarUrl,
        timestamp
      }
  
      let msgRef
      if (currentRoom === 'public') {
        msgRef = dbRef(db, 'messages/public')
      } else if (currentGroupId) {
        msgRef = dbRef(db, `messages/groups/${currentGroupId}`)
      } else {
        const roomId = generateRoomId(user.uid, currentRoom)
        msgRef = dbRef(db, `messages/private/${roomId}`)
      }
  
      const newMsgRef = push(msgRef)
      await set(newMsgRef, msg)
    } catch (error) {
      console.error('上傳圖片失敗:', error)
    }
  }

  const handleAddFriend = async (friendId: string) => {
    if (!user) return
    const db = getDatabase()
  
    const myRef = dbRef(db, `users/${user.uid}/friends/${friendId}`)
    const friendRef = dbRef(db, `users/${friendId}/friends/${user.uid}`)
  
    await set(myRef, true)
    await set(friendRef, true)
  }

  const handleGoPublic = () => {
    setCurrentRoom('public')
    setCurrentGroupId('')
    setDrawerOpen(false)
  }

  const handleSelectFriend = (friendId: string) => {
    setCurrentRoom(friendId)
    setCurrentGroupId('')
    setDrawerOpen(false)
  }

  const handleSelectGroup = (groupId: string) => {
    setCurrentRoom('')
    setCurrentGroupId(groupId)
    setDrawerOpen(false)
  }

  const handleProfile = () => {
    navigate('/profile')
    setDrawerOpen(false)
  }

  const handleLogout = async () => {
    await auth.signOut()
    navigate('')
  }

  const handleCreateGroup = async () => {
    if (!newGroupName.trim() || selectedFriends.length === 0) {
      alert('請輸入群組名稱並選擇至少一位朋友')
      return
    }

    const db = getDatabase()
    if (!user) return

    const groupRef = dbRef(db, 'groups')
    const newGroup = push(groupRef)

    const members = {}
    selectedFriends.forEach((uid) => (members[uid] = true))
    members[user.uid] = true

    await set(newGroup, { name: newGroupName, members })

    setShowGroupModal(false)
    setNewGroupName('')
    setSelectedFriends([])
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {backgroundElement}
      
      {showGifModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4">
            <div className="bg-black/90 p-6 rounded-2xl space-y-4 w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-2">搜尋 GIF ✨</h2>
            <input
                type="text"
                value={gifSearch}
                onChange={(e) => setGifSearch(e.target.value)}
                placeholder="輸入關鍵字..."
                className="w-full rounded-xl p-2 text-black placeholder-gray-500"
            />
            <div className="flex justify-end">
                <button
                onClick={() => fetchGifs(gifSearch)}
                className="bg-[#bfa382] text-white px-4 py-2 rounded-full hover:scale-105 transition"
                >
                搜尋
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {gifResults.map((gif) => (
                <img
                    key={gif.id}
                    src={gif.media[0].tinygif.url}
                    alt="gif"
                    className="rounded-lg cursor-pointer hover:scale-105 transition"
                    onClick={() => handleSendGif(gif.media[0].tinygif.url)}
                />
                ))}
            </div>

            <div className="flex justify-center pt-4">
                <button
                onClick={() => setShowGifModal(false)}
                className="text-gray-400 hover:text-white"
                >
                關閉
                </button>
            </div>
            </div>
        </div>
        )}

      {showGroupModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/90 text-white/80 p-6 rounded-2xl w-80 space-y-4">
            <h2 className="text-xl font-bold">創建新群組</h2>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="群組名稱"
              className="w-full bg-white/10 rounded-lg px-3 py-2 mb-2"
            />
            <div className="max-h-40 overflow-y-auto space-y-2">
            {friends.filter((friend) => myFriends.includes(friend.uid)).length === 0 ? (
                <div className="text-gray-400 text-center py-4">
                尚未加任何好友，無法建立群組喔 🌸
                </div>
            ) : (
                friends
                .filter((friend) => myFriends.includes(friend.uid))
                .map((friend) => (
                    <div key={friend.uid} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        value={friend.uid}
                        onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedFriends((prev) => [...prev, friend.uid])
                        } else {
                            setSelectedFriends((prev) => prev.filter((id) => id !== friend.uid))
                        }
                        }}
                    />
                    <span>{friend.nickname}</span>
                    </div>
                ))
            )}
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setShowGroupModal(false)} className="px-4 py-2 rounded-lg bg-gray-600">
                Cancel
              </button>
              <button onClick={handleCreateGroup} className="px-4 py-2 rounded-lg bg-green-600">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen overflow-hidden relative">
        {/* Sidebar */}
        <div className={`fixed md:static inset-y-0 left-0 z-10 transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-black/50 backdrop-blur-md text-white p-4 flex flex-col space-y-4 transition-transform duration-300 ease-in-out`}>

          <button onClick={handleGoPublic} className="text-lg font-bold hover:underline" style={{ color: themeColor }}>
            🌎 Public Chat
          </button>

          <h2 className="text-sm font-semibold text-gray-300">All Users</h2>
          <div className="flex flex-col space-y-2 flex-1 overflow-y-auto">
          {friends && friends.map((friend) => (
              <div key={friend.uid} className="flex items-center justify-between hover:bg-white/10 p-2 rounded transition">
              <button
                  onClick={() => handleSelectFriend(friend.uid)}
                  className="flex items-center space-x-2"
              >
                  <img src={friend.avatarUrl || '/image/default-avatar.jpg'} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  <span>{friend.nickname}</span>
              </button>

              {!myFriends.includes(friend.uid) && (
                  <button
                  onClick={() => handleAddFriend(friend.uid)}
                  className="text-green-400 hover:text-green-300 text-lg"
                  >
                  ➕
                  </button>
              )}
              </div>
          ))}
          </div>

          <h2 className="text-sm font-semibold text-gray-300">Groups</h2>
          <div className="flex flex-col space-y-2">
            {groups.filter(group => group.members[user?user.uid:0]).map((group) => (
              <button
                key={group.id}
                onClick={() => handleSelectGroup(group.id)}
                className="hover:bg-white/10 p-2 rounded transition"
              >
                🧑‍🤝‍🧑 {group.name}
              </button>
            ))}
          </div>

          <button onClick={() => setShowGroupModal(true)} className="text-sm bg-white/20 hover:bg-white/30 text-white py-1 px-3 rounded-full transition">
            ➕ Create Group
          </button>

          <div className="flex space-x-4 pt-4 border-t border-white/20">
            <button onClick={() => navigate('/')} className="text-sm hover:underline" style={{ color: themeColor }}>
                🏠
            </button>
            <button onClick={handleProfile} className="text-sm hover:underline" style={{ color: themeColor }}>
              Profile
            </button>
            <button onClick={handleLogout} className="text-sm text-red-400 hover:underline">
              Logout
            </button>
          </div>

        </div>

        {/* Chatroom內容 */}
        <div className="flex flex-1 flex-col bg-black/50 backdrop-blur-md text-white relative shadow-inner">
          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="p-4">
                <input
                    type="text"
                    placeholder="搜尋訊息 🔍"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#bfa382] transition"
                />
            </div>
            {messages
               .filter((msg) => {
                    if (!searchText.trim()) return true
                    const lowerSearch = searchText.toLowerCase()
                    const textMatch = msg.text?.toLowerCase().includes(lowerSearch)
                    return textMatch
                })
                .length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">
                      沒有找到相關訊息喔 🌸
                    </div>
                  ) : ( messages
                    .filter((msg) => {
                      if (!searchText.trim()) return true
                      const lowerSearch = searchText.toLowerCase()
                      const textMatch = msg.text?.toLowerCase().includes(lowerSearch)
                      return textMatch
                    })
                    .map((msg) => (
                    <div id={`msg-${msg.id}`} className={`flex ${msg.sender === user?.uid ? 'justify-end' : 'justify-start'} fade-in`}>
                        <div className="flex items-end space-x-2">
                        {msg.sender !== user?.uid && (
                            <img src={msg.avatarUrl || '/image/default-avatar.jpg'} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                        )}
                        <div className="flex flex-col items-start max-w-xs">

                        {msg.sender === user?.uid && (
                                <button
                                onClick={() => handleUnsendWithAnimation(msg.id)}
                                className="absolute -top-3 right-0 text-xs hover:text-red-400 transition"
                                title="收回訊息"
                                >
                                ↩️
                                </button>
                            )}

                        <div className="p-3 rounded-2xl break-words text-sm" style={{ backgroundColor: msg.sender === user?.uid ? themeColor : '#d1d5db', color: msg.sender === user?.uid ? 'white' : 'black' }}>
                            {msg.text && <span>{msg.text}</span>}

                            {msg.imageUrl && (
                                <img
                                src={msg.imageUrl}
                                alt="uploaded"
                                className="mt-2 max-w-[200px] rounded-xl cursor-pointer hover:scale-105 transition"
                                onClick={() => window.open(msg.imageUrl, "_blank")}
                                />
                            )}

                            {msg.gifUrl && (
                            <img
                                src={msg.gifUrl}
                                alt="gif"
                                className="mt-2 max-w-[200px] rounded-xl cursor-pointer hover:scale-105 transition"
                                onClick={() => window.open(msg.gifUrl, "_blank")}
                            />
                            )}
                            </div>
                            <span className="text-xs text-gray-400 mt-1 ml-2">{formatTime(msg.timestamp)}</span>
                        </div>
                        {msg.sender === user?.uid && (
                            <img src={msg.avatarUrl || '/image/default-avatar.jpg'} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                        )}
                        </div>
                    </div>
            )))}
            <div ref={bottomRef}></div>
          </div>

          {/* Message Input */}
          <div className="p-4 bg-black/80 backdrop-blur-md flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-xl px-4 py-2 text-black placeholder-gray-500"
            />
            {/* 圖片上傳按鈕 */}
            <input
                type="file"
                accept="image/*"
                id="image-upload"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />
            <label htmlFor="image-upload" 
            className="cursor-pointer px-4 py-2 rounded-xl font-bold hover:scale-105 hover:brightness-110 transition"
            style={{ backgroundColor: themeColor }}>
                🖼️
            </label>

            <button
            onClick={() => setShowGifModal(true)}
            className="px-4 py-2 rounded-xl font-bold hover:scale-105 hover:brightness-110 transition"
            style={{ backgroundColor: themeColor }}
            >
            🔎
            </button>

            <button
              onClick={handleSend}
              style={{ backgroundColor: themeColor }}
              className="px-4 py-2 rounded-xl font-bold hover:scale-105 hover:brightness-110 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatroomPage