import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTE_PATHS } from '@/router/constants'
import { useAuthStore } from '@/store/useAuthStore'

const RegistrationCompleteGuard = ({ children }) => {
  const registrationComplete = useAuthStore((state) => state.registrationComplete)
  const [hydrated, setHydrated] = useState(
    () => useAuthStore.persist?.hasHydrated?.() ?? true
  )

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => setHydrated(true))
    return unsubscribe
  }, [])

  if (!hydrated) {
    return null
  }

  if (!registrationComplete) {
    return <Navigate to={ROUTE_PATHS.REGISTRATION} replace />
  }

  return children
}

export default RegistrationCompleteGuard
