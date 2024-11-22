import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "@/api/axiosConfig"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        }
      )

      console.log(response) // Handle response data
      // You can redirect or show a success message here
      navigate("/chat")
    } catch (err) {
      setError("Failed to login. Please try again.")
      console.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-auto max-w-[350px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
