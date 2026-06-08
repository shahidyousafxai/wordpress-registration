import { appEnv } from '@/network/env'

function pickField(source, ...keys) {
  if (!source) return null

  for (const key of keys) {
    const value = source[key]
    if (value != null && value !== '') return value
  }

  return null
}

function normalizeUserRole(userRole) {
  if (typeof userRole === 'string') {
    return userRole.toLowerCase()
  }

  return userRole?.[0]?.toLowerCase() ?? null
}

export function mapMediaKitSignupToSession(result) {
  if (!result) return null

  return {
    accessToken: pickField(result, 'jwtToken', 'JwtToken', 'accessToken', 'AccessToken'),
    refreshToken: pickField(result, 'refreshToken', 'RefreshToken'),
    userId: pickField(result, 'userId', 'UserId'),
    email: pickField(result, 'email', 'Email'),
    username:
      pickField(result, 'userName', 'UserName', 'username', 'Username', 'email', 'Email'),
    userRole: normalizeUserRole(pickField(result, 'userRole', 'UserRole')),
    status: pickField(result, 'status', 'Status'),
    message: pickField(result, 'message', 'Message'),
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

function extractUserId(result) {
  return pickField(result, 'userId', 'UserId')
}

export function buildMediaKitUrl(userId) {
  if (!userId) return null

  console.log("---------------111", `${appEnv.mediaKitAppUrl}/media-kit/${userId}`)
  return `${appEnv.mediaKitAppUrl}/media-kit/${userId}`
}

export function parseMediaKitSignupResponse(response) {
  const result = response?.result ?? response
  const userId = extractUserId(result)
  const session = mapMediaKitSignupToSession(result)
  const url = buildMediaKitUrl(userId)

  return { userId, session, url, result }
}
