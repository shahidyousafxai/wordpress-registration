import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const URL = import.meta.env.VITE_API_BASE_URL ?? '/api'
const VERSION = 'api/v1'

export const BASE_URL = `${URL}/${VERSION}`

export const queryKeys = {
  auth: {
    all: ['auth'],
    me: () => [...queryKeys.auth.all, 'me'],
  },
}

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().clearAuth()
    }
    return Promise.reject(error)
  }
)

export function get(url, config) {
  return http.get(url, config).then((res) => res.data)
}

export function post(url, data, config) {
  return http.post(url, data, config).then((res) => res.data)
}

export function put(url, data, config) {
  return http.put(url, data, config).then((res) => res.data)
}

export function patch(url, data, config) {
  return http.patch(url, data, config).then((res) => res.data)
}

export function del(url, config) {
  return http.delete(url, config).then((res) => res.data)
}

export { http }
