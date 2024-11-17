import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Chat from './pages/Chat.tsx'

type Props = {}

export default function App({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}
