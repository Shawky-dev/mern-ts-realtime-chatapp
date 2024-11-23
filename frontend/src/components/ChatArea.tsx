import React, { useState, useEffect, useRef } from 'react'
import { ChatMessageList } from './ui/chat/chat-message-list'
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from './ui/chat/chat-bubble'
import { Smile, Paperclip, SendHorizontal, Mic } from 'lucide-react'
import { Input } from './ui/input'

export type message = {
  text: string
  timestamp: string
  userID: string
  isSent: boolean
}

interface Props {
  socket: any
}

export default function ChatArea({ socket }: Props) {
  const [isTyping, SetIsTyping] = useState<boolean>(false)
  const [message, SetMessage] = useState<string>('')
  const [messages, setMessages] = useState<message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    SetMessage(e.target.value)
    SetIsTyping(e.target.value.length > 0)
  }

  const handleSubmit = () => {
    if (message === '') {
      return
    }
    socket.emit('sendMessage', message) // Emit message to server
    const newMessage = {
      text: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      userID: '1',
      isSent: true,
    }
    setMessages([...messages, newMessage])
    SetMessage('')
  }

  useEffect(() => {
    socket.on('receiveMessage', (msg: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: msg,
          timestamp: new Date().toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          userID: '2',
          isSent: false,
        },
      ])
    })
    return () => {
      socket.off('receiveMessage')
    }
  }, [socket])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <div className="grow overflow-scroll">
        <ChatMessageList className="overflow-scroll">
          {messages.map((msg, index) =>
            msg.isSent ? (
              <ChatBubble variant="sent" id={index.toString()}>
                <ChatBubbleAvatar fallback="US" />
                <ChatBubbleMessage variant="sent" className="">
                  {msg.text}
                  <ChatBubbleTimestamp timestamp={msg.timestamp} />
                </ChatBubbleMessage>
              </ChatBubble>
            ) : (
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage variant="received">
                  {msg.text}
                  <ChatBubbleTimestamp timestamp={msg.timestamp} />
                </ChatBubbleMessage>
              </ChatBubble>
            )
          )}
          <div ref={messagesEndRef} />
          {/* Loading */}
          {/* <ChatBubble variant="received">
        <ChatBubbleAvatar fallback="AI" />
        <ChatBubbleMessage isLoading />
      </ChatBubble> */}
        </ChatMessageList>
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
    </>
  )
}
