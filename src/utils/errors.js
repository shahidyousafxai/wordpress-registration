export function messageFromAxiosError(error, fallback = 'Something went wrong') {
  const data = error?.response?.data

  return (
    data?.message ??
    data?.data?.message ??
    data?.error?.message ??
    (typeof data === 'string' ? data : undefined) ??
    (typeof error?.message === 'string' ? error.message : undefined) ??
    fallback
  )
}
