// axiosConfig.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API URL
  withCredentials: true, // This will include credentials in CORS requests
})

export default axiosInstance
