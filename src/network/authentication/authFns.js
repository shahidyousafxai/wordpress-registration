import { WORDPRESS } from '@/network/constant'
import { generateMediaKitFn } from '@/network/mediaKit/mediaKitFns'
import { parseMediaKitSignupResponse } from '@/network/mediaKit/mediaKitUrl'
import { postForm } from '@/network/wordpress/wpHttp'

function mapAuthUser(apiUser) {
  return {
    userId: apiUser?.userId ?? apiUser?.user_id ?? apiUser?.uuid ?? apiUser?.id ?? null,
    userRole: apiUser?.userRole ?? apiUser?.user_role ?? apiUser?.role ?? 'creator',
    planType: apiUser?.planType ?? apiUser?.plan_type ?? 'free',
    isNewUser: apiUser?.isNewUser ?? apiUser?.is_new_user ?? true,
    isEmailVerified: apiUser?.isEmailVerified ?? apiUser?.is_email_verified ?? false,
    email: apiUser?.email ?? apiUser?.user_email ?? null,
    firstName: apiUser?.firstName ?? apiUser?.first_name ?? null,
  }
}

function normalizeAuthResponse(response) {
  const user = mapAuthUser(
    response?.user ?? response?.currentUser ?? response?.data ?? response
  )
  const token =
    response?.accessToken ??
    response?.access_token ??
    response?.token ??
    null

  return { user, token }
}

function toCreatorSignupParams({ email, password, firstName, instagramUsername }) {
  const fallback = firstName?.trim() || ' '

  return {
    user_email: email,
    password,
    first_name: fallback,
    last_name: fallback,
    instagram_username: instagramUsername?.trim() || ' ',
    instagram_followers: ' ',
  }
}

async function creatorSignupFn(payload) {
  const response = await postForm(WORDPRESS.CREATOR_SIGNUP, toCreatorSignupParams(payload))
  return normalizeAuthResponse(response)
}

async function validateLoginFn({ email, password }) {
  const response = await postForm(WORDPRESS.VALIDATE, { email, password })
  return normalizeAuthResponse(response)
}

export function loginFn(payload) {
  return validateLoginFn(payload)
}

export async function registerFn(payload) {
  const [authResult, mediaKitResult] = await Promise.all([
    creatorSignupFn(payload),
    generateMediaKitFn(payload),
  ])

  return {
    ...authResult,
    mediaKit: parseMediaKitSignupResponse(mediaKitResult),
  }
}
