import axios from 'axios'
import { appEnv } from '@/network/env'

const BASE_URL = appEnv.mediaKitApiBaseUrl

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
