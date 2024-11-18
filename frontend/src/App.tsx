import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Chat from './pages/Chat.tsx'
import LoginForm from './pages/LoginForm.tsx'
import Signup from './pages/Signup.tsx'
import { IconContext } from 'react-icons'
import { socket } from './socket'
type Props = {}

export default function App({}: Props) {
  useEffect(() => {
    function onConnect() {
      console.log('Connected')
    }
    socket.on('connect', onConnect)
    return () => {
      socket.off('connect', onConnect)
    }
  }, [])

  return (
    <IconContext.Provider
      value={{ color: 'blue', className: 'global-class-name' }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </IconContext.Provider>
  )
}
