import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_PATHS } from '@/router/constants'

const Registration = lazy(() => import('@/panels/Registration'))
const ThankYou = lazy(() => import('@/panels/ThankYou'))

const Router = () => (
  <Suspense>
    <Routes>
      <Route path="/" element={<Navigate to={ROUTE_PATHS.REGISTRATION} replace />} />
      <Route path={ROUTE_PATHS.REGISTRATION} element={<Registration />} />
      <Route path={ROUTE_PATHS.THANK_YOU} element={<ThankYou />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.REGISTRATION} replace />} />
    </Routes>
  </Suspense>
)

export default Router
