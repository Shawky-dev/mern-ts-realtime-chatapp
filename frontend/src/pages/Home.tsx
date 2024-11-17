import React, { useState } from 'react'

type Props = {}

const groups = [
  {
    id: 1,
    name: 'Tech Talk',
    description: 'Discuss the latest in tech',
    activeUsers: 120,
    image: 'https://via.placeholder.com/150?text=TT',
  },
  {
    id: 2,
    name: 'Gaming Zone',
    description: 'For all gaming enthusiasts',
    activeUsers: 85,
    image: 'https://via.placeholder.com/150?text=GZ',
  },
  {
    id: 3,
    name: 'Fitness Buddies',
    description: 'Share workout tips and more',
    activeUsers: 60,
    image: 'https://via.placeholder.com/150?text=FB',
  },
  {
    id: 4,
    name: 'Book Club',
    description: 'Discuss your favorite books',
    activeUsers: 42,
    image: 'https://via.placeholder.com/150?text=BC',
  },
]
import { useNavigate } from 'react-router-dom'

export default function Home({}: Props) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextGroup = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groups.length)
  }

  const prevGroup = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + groups.length) % groups.length
    )
  }

  const getGroup = (offset: number) => {
    return groups[(currentIndex + offset + groups.length) % groups.length]
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Web Chatroom</h1>
          <div>
            <button
              onClick={() => navigate('/login')}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Join a Chatroom Today!
          </h2>
          <p className="text-gray-600 text-lg">
            Connect with like-minded people in various chatrooms.
          </p>
        </section>

        {/* Carousel Section */}
        <section className="relative text-center">
          <div className="flex justify-center items-center gap-4">
            {/* Previous Group */}
            <div className="w-64 bg-gray-200 p-4 rounded-lg opacity-50 scale-90 transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={getGroup(-1).image}
                  alt={getGroup(-1).name}
                  className="w-12 h-12 rounded-full"
                />
                <h3 className="text-lg font-bold text-gray-500">
                  {getGroup(-1).name}
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                {getGroup(-1).description}
              </p>
            </div>

            {/* Current Group */}
            <div className="w-80 bg-white shadow-lg p-6 rounded-lg scale-100 transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={getGroup(0).image}
                  alt={getGroup(0).name}
                  className="w-16 h-16 rounded-full"
                />
                <h3 className="text-2xl font-bold text-gray-800">
                  {getGroup(0).name}
                </h3>
              </div>
              <p className="text-gray-600 mb-2">{getGroup(0).description}</p>
              <p className="text-gray-500 mb-4">
                Active Users:{' '}
                <span className="font-bold">{getGroup(0).activeUsers}</span>
              </p>
              <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Join Now
              </button>
            </div>

            {/* Next Group */}
            <div className="w-64 bg-gray-200 p-4 rounded-lg opacity-50 scale-90 transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={getGroup(1).image}
                  alt={getGroup(1).name}
                  className="w-12 h-12 rounded-full"
                />
                <h3 className="text-lg font-bold text-gray-500">
                  {getGroup(1).name}
                </h3>
              </div>
              <p className="text-sm text-gray-500">{getGroup(1).description}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={prevGroup}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>
            <button
              onClick={nextGroup}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
