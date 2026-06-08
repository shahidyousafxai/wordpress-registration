import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_MEDIA_KIT_API_BASE_URL ?? 'https://prod-base-api.ilolas.com'

export const mediaKitHttp = axios.create({
  baseURL: BASE_URL,
  timeout: 60_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function postJson(url, data) {
  return mediaKitHttp.post(url, data).then((res) => res.data)
}
