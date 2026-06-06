import { post } from '@/network/http'
import { AUTH } from '@/network/constant'

const USE_AUTH_STUB = import.meta.env.VITE_USE_AUTH_STUB === 'true'

function mapAuthUser(apiUser) {
  return {
    userId: apiUser?.userId ?? apiUser?.user_id ?? apiUser?.uuid ?? apiUser?.id ?? null,
    userRole: apiUser?.userRole ?? apiUser?.user_role ?? apiUser?.role ?? 'creator',
    planType: apiUser?.planType ?? apiUser?.plan_type ?? 'free',
    isNewUser: apiUser?.isNewUser ?? apiUser?.is_new_user ?? false,
    isEmailVerified: apiUser?.isEmailVerified ?? apiUser?.is_email_verified ?? false,
    email: apiUser?.email ?? null,
    firstName: apiUser?.firstName ?? apiUser?.first_name ?? null,
  }
}

function normalizeAuthResponse(response) {
  const payload = response?.data ?? response
  const user = mapAuthUser(payload?.user ?? payload?.currentUser ?? payload)
  const token =
    payload?.accessToken ??
    payload?.access_token ??
    payload?.token ??
    null

  return { user, token }
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

async function stubRegisterFn({ email }) {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return {
    user: {
      userId: 'demo-creator',
      userRole: 'creator',
      planType: 'free',
      isNewUser: true,
      isEmailVerified: false,
      email,
    },
    token: 'stub-token',
  }
}

export function loginFn(payload) {
  if (USE_AUTH_STUB) {
    return stubLoginFn(payload)
  }

  return post(AUTH.LOGIN, payload).then(normalizeAuthResponse)
}

export function registerFn(payload) {
  if (USE_AUTH_STUB) {
    return stubRegisterFn(payload)
  }

  return post(AUTH.REGISTER, payload).then(normalizeAuthResponse)
}
