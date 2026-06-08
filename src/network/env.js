const WP_API_ORIGIN = 'https://app.ilolas.com'

const DEFAULTS = {
  apiBaseUrl: '/api',
  wpApiBaseUrl: import.meta.env.PROD ? `${WP_API_ORIGIN}/wp-json` : '/wp-json',
  mediaKitApiBaseUrl: import.meta.env.PROD
    ? 'https://prod-base-api.ilolas.com'
    : '/base-api',
  mediaKitAppUrl: 'https://mediakit.ilolas.com',
  shopUrl: 'https://app.ilolas.com/shop',
  influencerDashboardUrl: 'https://app.ilolas.com/influencer-dashboard/',
  privacyPolicyUrl: 'https://ilolas.com/privacy-policy/',
  contactUrl: 'https://ilolas.com/contact-us/',
  brandTermsUrl: 'https://ilolas.com/terms-conditions-brands/',
  creatorTermsUrl: 'https://ilolas.com/terms-conditions-creators/',
  mediaKitAuthCookieName: '_wp_knock',
  mediaKitCookieDomain: '.ilolas.com',
  wpSsoSystemToken: '',
}

function readString(key, fallback) {
  const value = import.meta.env[key]
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

/** API config — defaults live here; override via VITE_* in .env if needed. */
export const appEnv = {
  apiBaseUrl: readString('VITE_API_BASE_URL', DEFAULTS.apiBaseUrl),
  wpApiBaseUrl: readString('VITE_WP_API_BASE_URL', DEFAULTS.wpApiBaseUrl),
  mediaKitApiBaseUrl: readString('VITE_MEDIA_KIT_API_BASE_URL', DEFAULTS.mediaKitApiBaseUrl),
  mediaKitAppUrl: readString('VITE_MEDIA_KIT_APP_URL', DEFAULTS.mediaKitAppUrl),
  shopUrl: readString('VITE_SHOP_URL', DEFAULTS.shopUrl),
  influencerDashboardUrl: readString(
    'VITE_INFLUENCER_DASHBOARD_URL',
    DEFAULTS.influencerDashboardUrl
  ),
  privacyPolicyUrl: readString('VITE_PRIVACY_POLICY_URL', DEFAULTS.privacyPolicyUrl),
  contactUrl: readString('VITE_CONTACT_URL', DEFAULTS.contactUrl),
  brandTermsUrl: readString('VITE_BRAND_TERMS_URL', DEFAULTS.brandTermsUrl),
  creatorTermsUrl: readString('VITE_CREATOR_TERMS_URL', DEFAULTS.creatorTermsUrl),
  mediaKitAuthCookieName: readString(
    'VITE_MEDIA_KIT_AUTH_COOKIE_NAME',
    DEFAULTS.mediaKitAuthCookieName
  ),
  mediaKitCookieDomain: readString(
    'VITE_MEDIA_KIT_COOKIE_DOMAIN',
    DEFAULTS.mediaKitCookieDomain
  ),
  wpSsoSystemToken: readString('VITE_SSO_SYSTEM_TOKEN', DEFAULTS.wpSsoSystemToken),
}
