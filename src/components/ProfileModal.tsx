import React from 'react'

interface ProfileModalProps {
  user: {
    uid: string
    nickname: string
    avatarUrl?: string
    statusMessage?: string
  }
  isFriend: boolean
  onClose: () => void
  onStartChat: () => void
  onAddFriend: () => void
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  isFriend,
  onClose,
  onStartChat,
  onAddFriend
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-black/90 p-6 rounded-2xl space-y-4 w-full max-w-xs flex flex-col items-center">
        <img
          src={user.avatarUrl || '/image/default-avatar.jpg'}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="text-xl font-bold text-white">{user.nickname}</h2>

        {user.statusMessage && (
          <p className="text-sm italic text-gray-400 text-center px-2">
            {user.statusMessage}
          </p>
        )}

        {isFriend ? (
          <button
            onClick={onStartChat}
            className="bg-[#bfa382] text-white px-4 py-2 rounded-full hover:scale-105 hover:brightness-110 transition"
          >
            開始聊天
          </button>
        ) : (
          <button
            onClick={onAddFriend}
            className="bg-[#bfa382] text-white px-4 py-2 rounded-full shadow-md hover:scale-105 hover:brightness-110 transition-all duration-200"
          >
            ➕ 加好友
          </button>
        )}

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white mt-4"
        >
          關閉
        </button>
      </div>
    </div>
  )
}

export default ProfileModal
