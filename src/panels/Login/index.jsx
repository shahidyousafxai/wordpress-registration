import { useSearchParams } from 'react-router-dom'
import { AuthLayout } from '@/components/Shared/Auth'
import LoginForm from './components/LoginForm'
import { useLoginMutation } from '@/network/authentication/authQueries'
import { messageFromAxiosError } from '@/utils'

const Login = () => {
  const [searchParams] = useSearchParams()
  const loginMutation = useLoginMutation()

  const welcomeName =
    searchParams.get('name') ??
    searchParams.get('firstName') ??
    ''

  const handleSubmit = (values) => {
    loginMutation.reset()
    loginMutation.mutate(values)
  }

  const submitError = loginMutation.error
    ? messageFromAxiosError(loginMutation.error, 'Login failed')
    : null

  return (
    <AuthLayout>
      <LoginForm
        welcomeName={welcomeName}
        onSubmit={handleSubmit}
        isSubmitting={loginMutation.isPending}
        submitError={submitError}
      />
    </AuthLayout>
  )
}

export default Login
