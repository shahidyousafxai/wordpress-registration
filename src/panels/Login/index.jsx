import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthLayout } from '@/components/Shared/Auth'
import LoginForm from './components/LoginForm'
import { useLoginMutation } from '@/network/authentication/authQueries'
import { ROUTE_PATHS } from '@/router/constants'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const loginMutation = useLoginMutation()

  const welcomeName =
    searchParams.get('name') ??
    searchParams.get('firstName') ??
    ''

  const handleSubmit = (values) => {
    loginMutation.mutate(values, {
      onSuccess: ({ user }) => {
        navigate(ROUTE_PATHS.THANK_YOU, {
          replace: true,
          state: { firstName: user?.firstName },
        })
      },
    })
  }

  return (
    <AuthLayout>
      <LoginForm
        welcomeName={welcomeName}
        onSubmit={handleSubmit}
        isSubmitting={loginMutation.isPending}
      />
    </AuthLayout>
  )
}

export default Login
