import axios from 'axios'
import { appEnv } from '@/network/env'

export const wpHttp = axios.create({
  baseURL: appEnv.wpApiBaseUrl,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

wpHttp.interceptors.request.use((config) => {
  if (appEnv.wpSsoSystemToken) {
    config.headers['sso-system-token'] = appEnv.wpSsoSystemToken
  }
  return config
})

export function postForm(url, params) {
  const body = new URLSearchParams(params).toString()
  return wpHttp.post(url, body).then((res) => res.data)
}
