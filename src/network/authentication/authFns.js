import { post } from '@/network/http'
import { AUTH, WORDPRESS } from '@/network/constant'
import { generateMediaKitFn } from '@/network/mediaKit/mediaKitFns'
import { postForm } from '@/network/wordpress/wpHttp'

const USE_AUTH_STUB = import.meta.env.VITE_USE_AUTH_STUB === 'true'

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
  const payload = response?.data ?? response
  const user = mapAuthUser(payload?.user ?? payload?.currentUser ?? payload?.data ?? payload)
  const token =
    payload?.accessToken ??
    payload?.access_token ??
    payload?.token ??
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

async function stubLoginFn({ email }) {
  await new Promise((resolve) => setTimeout(resolve, 400))

  const name = email?.split('@')?.[0] ?? 'Creator'

  return {
    user: {
      userId: 'demo-creator',
      userRole: 'creator',
      planType: 'free',
      isNewUser: false,
      isEmailVerified: true,
      email,
      firstName: name.charAt(0).toUpperCase() + name.slice(1),
    },
    token: 'stub-token',
  }
}

async function stubRegisterFn({ email, firstName }) {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return {
    user: {
      userId: 'demo-creator',
      userRole: 'creator',
      planType: 'free',
      isNewUser: true,
      isEmailVerified: false,
      email,
      firstName: firstName ?? null,
    },
    token: 'stub-token',
    mediaKit: { status: 'stub' },
  }
}

export function loginFn(payload) {
  if (USE_AUTH_STUB) {
    return stubLoginFn(payload)
  }

  return post(AUTH.LOGIN, payload).then(normalizeAuthResponse)
}

export async function registerFn(payload) {
  if (USE_AUTH_STUB) {
    return stubRegisterFn(payload)
  }

  const [authResult, mediaKitResult] = await Promise.all([
    creatorSignupFn(payload),
    generateMediaKitFn(payload),
  ])

  return { ...authResult, mediaKit: mediaKitResult }
}
