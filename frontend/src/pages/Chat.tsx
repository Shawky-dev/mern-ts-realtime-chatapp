import React from 'react'
import { FaCog, FaSearch } from 'react-icons/fa'

type Props = {}

export default function Chat({}: Props) {
  return (
    <div>
      <div className="h-screen flex bg-gray-100">
        {/* <!-- Settings Sidebar --> */}
        <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-between pt-6 pb-3  space-y-4">
          <div className="flex flex-col gap-4">
            <FaSearch
              className="text-gray-600 cursor-pointer"
              size={24}
              color="black"
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <FaCog
              className="text-gray-600 cursor-pointer "
              color="black"
              size={24}
            />
            <img
              src="https://picsum.photos/id/237/200/300"
              alt="Profile"
              className="w-12 h-12 rounded-full overflow-visible"
            />
          </div>
        </div>

        {/* <!-- Sidebar --> */}
        <div className="w-1/4 bg-gray-50 border-r border-gray-200">
          {/* <!-- Header --> */}
          <div className="p-4 border-b border-gray-300 bg-gray-200 flex justify-between items-center">
            <h1 className="text-lg font-bold">Chats</h1>
          </div>
          {/* <!-- Contact List --> */}
          <ul className="overflow-y-auto h-[calc(100%-64px)]">
            <li className="p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-center">
              <img
                src="https://picsum.photos/id/237/200/300"
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-gray-600 truncate">
                  Hey, are you free now?
                </p>
              </div>
            </li>
            {/* <!-- Repeat for other contacts --> */}
          </ul>
        </div>

        {/* <!-- Chat Window --> */}
        <div className="w-3/4 flex flex-col">
          {/* <!-- Chat Header --> */}
          <div className="p-4 border-b border-gray-300 bg-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://picsum.photos/id/237/200/300"
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <h2 className="text-lg font-bold">John Doe</h2>
            </div>
            <div className="text-sm text-gray-600">Online</div>
          </div>

          {/* <!-- Chat Messages --> */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
            {/* <!-- Incoming Message --> */}
            <div className="flex items-start">
              <div className="bg-gray-200 p-2 rounded-lg max-w-xs">
                <p className="text-sm">Hey! How are you?</p>
              </div>
            </div>
            {/* <!-- Outgoing Message --> */}
            <div className="flex items-end justify-end">
              <div className="bg-green-200 p-2 rounded-lg max-w-xs">
                <p className="text-sm">I'm good! How about you?</p>
              </div>
            </div>
          </div>

          {/* <!-- Input Box --> */}
          <div className="p-4 bg-gray-200 border-t border-gray-300">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Type a message"
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
