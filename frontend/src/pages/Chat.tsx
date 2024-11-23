'use client'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '@/api/axiosConfig'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import ChatArea from '@/components/ChatArea'
import { io } from 'socket.io-client' // Add this line

export default function Chat() {
  const navigate = useNavigate()
  const socket = io('http://localhost:3000') // Add this line

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get(
          'http://localhost:3000/auth/check-auth'
        )
        if (response.data.success) {
          //get user data
        }
      } catch (error) {
        console.error('User is not authenticated:', error)
        navigate('/login')

        // If there's an error (e.g., token invalid), the user stays on the home page
      }
    }

    checkAuth()
  }, [navigate])
  return (
    <div className="bg-[#ECE3D4] h-screen text-[#755132] font-[Cairo]">
      <div className="flex flex-row p-10 h-full">
        {/* SideBar */}
        <div className="flex flex-row w-3/5">
          {/* settingsSidebar */}
          <div className="bg-[#755132] text-[#ECE3D4] w-1/12 flex flex-col">
            settings
          </div>
          {/* contactList */}
          <div className="flex flex-col bg-[#ECE3D4] border-t-2 border-b-[2px]  border-[#8F633D] w-full">
            <div className="bg-[#D5B990] h-16 w-full pt-3 pl-3">contact</div>
            <div className="">contact list</div>
          </div>
        </div>
        {/* Chat */}
        <div className="flex flex-col bg-[#ECE3D4] border-2 border-[#8F633D] grow w-full">
          <div className="bg-[#D5B990] h-16 pt-3 pl-3 pb-2 w-full p-1 flex flex-row">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <h1>[roomName]</h1>
              <p>[member1,member2]</p>
            </div>
          </div>
          <ChatArea socket={socket} /> {/* Pass socket as a prop */}
        </div>
      </div>
    </div>
  )
}
