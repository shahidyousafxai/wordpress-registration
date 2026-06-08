import { MEDIA_KIT } from '@/network/constant'
import { postJson } from './mediaKitHttp'

function toMediaKitPayload({ email, password, firstName, instagramUsername }) {
  const payload = {
    email,
    password,
    instagramHandle: instagramUsername?.replace(/^@/, '').trim() ?? '',
  }

  if (firstName?.trim()) {
    payload.firstName = firstName.trim()
  }

  return payload
}

function assertMediaKitSuccess(response) {
  if (response?.isError) {
    const exception = response?.responseException?.exceptionMessage
    const message =
      typeof exception === 'string'
        ? exception
        : exception?.title ?? 'Media kit generation failed'

    throw new Error(message)
  }

  return response
}

export function generateMediaKitFn(payload) {
  return postJson(MEDIA_KIT.GENERATE_FOR_WP_USER, toMediaKitPayload(payload)).then(
    assertMediaKitSuccess
  )
}
