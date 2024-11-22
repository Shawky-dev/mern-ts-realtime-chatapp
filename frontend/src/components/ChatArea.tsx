import React from 'react'
import { ChatMessageList } from './ui/chat/chat-message-list'
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from './ui/chat/chat-bubble'

export type message = {
  text: string
  timestamp: string
  userID: string
  isSent: boolean
}
type Props = {
  messages: message[]
}

export default function ChatArea({ messages }: Props) {
  return (
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
      {/* Loading */}
      {/* <ChatBubble variant="received">
        <ChatBubbleAvatar fallback="AI" />
        <ChatBubbleMessage isLoading />
      </ChatBubble> */}
    </ChatMessageList>
  )
}
