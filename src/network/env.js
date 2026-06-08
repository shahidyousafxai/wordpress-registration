const DEFAULTS = {
  useAuthStub: false,
  apiBaseUrl: '/api',
  wpApiBaseUrl: '/wp-json',
  mediaKitApiBaseUrl: import.meta.env.PROD
    ? 'https://prod-base-api.ilolas.com'
    : '/base-api',
  mediaKitAppUrl: 'https://mediakit.ilolas.com',
  shopUrl: 'https://app.ilolas.com/shop',
  mediaKitAuthCookieName: '_wp_knock',
  mediaKitCookieDomain: '.ilolas.com',
}

function readString(key, fallback) {
  const value = import.meta.env[key]
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

function readBool(key, fallback) {
  const value = import.meta.env[key]
  if (value === 'true') return true
  if (value === 'false') return false
  return fallback
}

/** API config — defaults live here; override via VITE_* in .env if needed. */
export const appEnv = {
  useAuthStub: readBool('VITE_USE_AUTH_STUB', DEFAULTS.useAuthStub),
  apiBaseUrl: readString('VITE_API_BASE_URL', DEFAULTS.apiBaseUrl),
  wpApiBaseUrl: readString('VITE_WP_API_BASE_URL', DEFAULTS.wpApiBaseUrl),
  mediaKitApiBaseUrl: readString('VITE_MEDIA_KIT_API_BASE_URL', DEFAULTS.mediaKitApiBaseUrl),
  mediaKitAppUrl: readString('VITE_MEDIA_KIT_APP_URL', DEFAULTS.mediaKitAppUrl),
  shopUrl: readString('VITE_SHOP_URL', DEFAULTS.shopUrl),
  mediaKitAuthCookieName: readString(
    'VITE_MEDIA_KIT_AUTH_COOKIE_NAME',
    DEFAULTS.mediaKitAuthCookieName
  ),
  mediaKitCookieDomain: readString(
    'VITE_MEDIA_KIT_COOKIE_DOMAIN',
    DEFAULTS.mediaKitCookieDomain
  ),
}
