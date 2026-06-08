import axios from 'axios'

const WP_BASE_URL = import.meta.env.VITE_WP_API_BASE_URL ?? '/wp-json'

export const wpHttp = axios.create({
  baseURL: WP_BASE_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export function postForm(url, params) {
  const body = new URLSearchParams(params).toString()
  return wpHttp.post(url, body).then((res) => res.data)
}
