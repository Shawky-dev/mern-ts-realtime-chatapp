'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '@/api/axiosConfig'
import { Input } from '@/components/ui/input'
import { Mic, Paperclip, SendHorizontal, Smile } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import ChatArea from '@/components/ChatArea'
import { message } from '@/components/ChatArea'
export default function Chat() {
  const [messages, setMessages] = useState<message[]>([])

  const navigate = useNavigate()
  const [isTyping, SetIsTyping] = useState<boolean>(false)
  const [message, SetMessage] = useState<string>('')
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    SetMessage(e.target.value)
    SetIsTyping(e.target.value.length > 0)
  }

  const handleSubmit = () => {
    if (message === '') {
      return
    }
    setMessages([
      ...messages,
      {
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        userID: '1',
        isSent: true,
      },
    ])
    SetMessage('')
  }

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
          <div className="grow overflow-scroll">
            <ChatArea messages={messages} />
          </div>
          <div className="h-14 bg-[#D5B990] p-2 flex flex-row items-center gap-2">
            <Smile color="#8F633D" />
            <Paperclip color="#8F633D" />
            <Input
              className="bg-[#ECE3D4]"
              value={message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit()
                }
              }}
            />
            {isTyping ? (
              <SendHorizontal
                color="#8F633D"
                onClick={handleSubmit}
                className=" cursor-pointer"
              />
            ) : (
              <Mic color="#8F633D" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
