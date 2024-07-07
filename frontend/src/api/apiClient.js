import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://stockify-y4e2.onrender.com',
  withCredentials: true, // Include credentials (cookies)
})

export default apiClient
