const AXIOS_GENERIC_MESSAGE = /^Request failed with status code \d+$/i

function parseErrorResponseData(data) {
  if (!data) return null

  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch {
      return { message: data }
    }
  }

  return data
}

export function extractExceptionMessage(raw) {
  if (!raw || typeof raw !== 'string') return undefined

  const firstLine = raw.split(/\r?\n/)[0]?.trim()
  if (!firstLine) return undefined

  const cleaned = firstLine.replace(/^System\.Exception:\s*/i, '').trim()
  return cleaned || undefined
}

function pickMessage(...candidates) {
  for (const candidate of candidates) {
    if (typeof candidate !== 'string') continue

    const message = candidate.trim()
    if (!message || AXIOS_GENERIC_MESSAGE.test(message)) continue

    return message
  }

  return undefined
}

export function messageFromAxiosError(error, fallback = 'Something went wrong') {
  const data = parseErrorResponseData(error?.response?.data)

  return (
    pickMessage(
      data?.message,
      data?.data?.message,
      data?.error?.message,
      typeof data?.error === 'string' ? data.error : undefined,
      extractExceptionMessage(data?.responseException?.exceptionMessage),
      extractExceptionMessage(error?.message),
      typeof data === 'string' ? data : undefined
    ) ?? fallback
  )
}
