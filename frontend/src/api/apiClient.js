import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'https://stockify-y4e2.onrender.com',
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})

export default apiClient
