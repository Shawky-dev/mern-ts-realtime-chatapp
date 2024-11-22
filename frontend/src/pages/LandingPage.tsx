import { useEffect, useState } from "react"
import div, { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  MessageCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"
import axiosInstance from "../api/axiosConfig"

const groups = [
  {
    id: 1,
    name: "Tech Enthusiasts",
    description: "Discuss the latest in technology and gadgets",
    members: 1234,
    logo: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Book Club",
    description: "Share your favorite reads and literary discussions",
    members: 567,
    logo: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    name: "Fitness Fanatics",
    description: "Tips, motivation, and support for your fitness journey",
    members: 890,
    logo: "https://github.com/shadcn.png",
  },
  {
    id: 4,
    name: "Foodies Unite",
    description: "Recipes, restaurant reviews, and culinary adventures",
    members: 2345,
    logo: "https://github.com/shadcn.png",
  },
  {
    id: 5,
    name: "Travel Bugs",
    description: "Share travel experiences and plan your next adventure",
    members: 1678,
    logo: "https://github.com/shadcn.png",
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/auth/check-auth",
          {
            withCredentials: true, // to include cookies in the request
          }
        )

        if (response.data.success) {
          // If the user is authenticated, redirect to /chat
          navigate("/chat")
        }
      } catch (error) {
        console.error("User is not authenticated:", error)
        // If there's an error (e.g., token invalid), the user stays on the home page
      }
    }

    checkAuth()
  }, [navigate])

  const [currentGroup, setCurrentGroup] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")

  const nextGroup = () => {
    setCurrentGroup((prev) => (prev + 1) % groups.length)
  }

  const prevGroup = () => {
    setCurrentGroup((prev) => (prev - 1 + groups.length) % groups.length)
  }

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const visibleGroups = [
    filteredGroups[
      (currentGroup - 1 + filteredGroups.length) % filteredGroups.length
    ],
    filteredGroups[currentGroup],
    filteredGroups[(currentGroup + 1) % filteredGroups.length],
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center justify-center">
          <MessageCircle className="h-6 w-6 mr-2" />
          <span className="font-bold">ChatApp</span>
        </div>
        <nav className="ml-auto flex gap-2 sm:gap-2">
          <div className="text-sm font-medium hover:underline underline-offset-4">
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
          <div className="text-sm font-medium hover:underline underline-offset-4">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-10 lg:py-10 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-10">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to <a className="text-red-500"> ChatApp!</a>
                </h1>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Discover Active Groups
                </h2>
                <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join conversations that matter to you. Explore our most
                  popular groups or search for your interests.
                </p>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <Button variant="outline" size="icon" onClick={prevGroup}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-4 overflow-hidden">
                  {visibleGroups.map((group, index) => (
                    <Card
                      key={group.id}
                      className={`w-full max-w-sm transition-opacity duration-300 ${
                        index === 1 ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <img
                            src={group.logo}
                            alt={`${group.name} logo`}
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <div>
                            <CardTitle>{group.name}</CardTitle>
                            <CardDescription>
                              {group.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <Users className="inline mr-2 h-4 w-4" />
                          {group.members} members
                        </p>
                        <Button className="w-full mt-4">Join Group</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={nextGroup}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-sm space-y-2">
                  <div className=" p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                    <p className="text-green-700 dark:text-green-300 font-semibold text-center">
                      <Users className="inline mr-2 h-5 w-5" />
                      <span className="text-2xl font-bold">5,714</span> users
                      active now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ChatApp. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <div className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </div>
          <div className="text-xs hover:underline underline-offset-4">
            Privacy
          </div>
        </nav>
      </footer>
    </div>
  )
}
