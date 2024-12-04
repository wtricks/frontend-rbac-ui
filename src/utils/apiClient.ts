import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Handle global requests
apiClient.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// Handle global errors
apiClient.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default apiClient
