import { Button } from '@/components/ui/button'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import Home from './pages/Chat'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import LandingPage from './pages/LandingPage'
type Props = {}

export default function App({}: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
