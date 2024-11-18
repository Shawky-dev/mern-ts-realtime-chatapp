// axiosConfig.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API URL
  withCredentials: true, // This will include credentials in CORS requests
})

export const handleLogout = async () => {
  try {
    const response = await axiosInstance.get('/auth/logout')
    console.log('Logout successful:', response.data)
    // Optionally, you can redirect the user to the login page or perform other actions
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

export default axiosInstance
