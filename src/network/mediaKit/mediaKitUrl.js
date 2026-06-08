import { appEnv } from '@/network/env'

function normalizeUserRole(userRole) {
  if (typeof userRole === 'string') {
    return userRole.toLowerCase()
  }

  return userRole?.[0]?.toLowerCase() ?? null
}

export function mapMediaKitSignupToSession(result) {
  if (!result) return null

  return {
    accessToken: result.jwtToken ?? null,
    refreshToken: result.refreshToken ?? null,
    userId: result.userId ?? null,
    email: result.email ?? null,
    username: result.userName ?? result.username ?? result.email ?? null,
    userRole: normalizeUserRole(result.userRole),
    status: result.status ?? null,
    message: result.message ?? null,
    isNewUser: true,
    isEmailVerified: false,
    emailConfirmed: null,
    isInstagramAuthentcated: null,
    lastLogin: null,
    registerationDateTime: null,
    termAndConditionAcceptDateTime: null,
    termAndConditionLink: null,
  }
}

function extractMediaKitId(result, response) {
  return (
    result?.mediaKitId ??
    result?.mediaKitUUID ??
    result?.mediaKitGuid ??
    result?.kitId ??
    response?.mediaKitId ??
    null
  )
}

export function buildMediaKitUrl(mediaKitId, session = null) {
  const base = `${appEnv.mediaKitAppUrl}/media-kit/${mediaKitId}`

  if (!session) {
    return base
  }

  const sso = btoa(JSON.stringify(session))
  return `${base}#sso=${encodeURIComponent(sso)}`
}

export function parseMediaKitSignupResponse(response) {
  const result = response?.result ?? response
  const mediaKitId = extractMediaKitId(result, response)
  const session = mapMediaKitSignupToSession(result)
  const url = mediaKitId ? buildMediaKitUrl(mediaKitId) : null

  return { mediaKitId, session, url, result }
}
