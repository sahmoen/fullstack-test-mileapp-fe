// import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
// })

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// export default api

import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://fullstack-test-mileapp-be-production.up.railway.app',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default api
