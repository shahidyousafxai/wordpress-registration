import Cookies from 'js-cookie'
import { appEnv } from '@/network/env'

const COOKIE_EXPIRES_DAYS = 7

function isSharedIlolasDomain() {
  if (typeof window === 'undefined') return false

  const hostname = window.location.hostname
  return hostname === 'ilolas.com' || hostname.endsWith('.ilolas.com')
}

function getCookieOptions() {
  const options = {
    path: '/',
    secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
    sameSite: 'Lax',
    expires: COOKIE_EXPIRES_DAYS,
  }

  if (isSharedIlolasDomain()) {
    options.domain = appEnv.mediaKitCookieDomain
  }

  return options
}

/** Sets the Media Kit `_wp_knock` cookie so mediakit.ilolas.com can restore the session. */
export function setMediaKitAuthCookie(session) {
  if (!session?.accessToken) return false

  const payload = btoa(JSON.stringify({ currentUser: session }))
  Cookies.set(appEnv.mediaKitAuthCookieName, payload, getCookieOptions())
  return true
}

export function clearMediaKitAuthCookie() {
  const options = { path: '/' }

  if (isSharedIlolasDomain()) {
    options.domain = appEnv.mediaKitCookieDomain
  }

  Cookies.remove(appEnv.mediaKitAuthCookieName, options)
}
