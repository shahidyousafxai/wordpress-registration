import { useSearchParams } from 'react-router-dom'
import { AuthLayout } from '@/components/Shared/Auth'
import LoginForm from './components/LoginForm'
import { useLoginMutation } from '@/network/authentication/authQueries'

const Login = () => {
  const [searchParams] = useSearchParams()
  const loginMutation = useLoginMutation()

  const welcomeName =
    searchParams.get('name') ??
    searchParams.get('firstName') ??
    ''

  const handleSubmit = (values) => {
    loginMutation.mutate(values)
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
