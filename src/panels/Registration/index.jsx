import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/Shared/Auth'
import CreatorApplicationForm from './components/CreatorApplicationForm'
import EmailStepForm from './components/EmailStepForm'
import { useRegisterMutation } from '@/network/authentication/authQueries'
import { ROUTE_PATHS } from '@/router/constants'
import { messageFromAxiosError } from '@/utils'

const Registration = () => {
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()
  const emailStepRef = useRef(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    instagramUsername: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })

  const handleCreatorSubmit = (values) => {
    setFormData((prev) => ({ ...prev, ...values }))
    setStep(2)
  }

  const handleBackFromStep2 = () => {
    const step2Values = emailStepRef.current?.getStepValues()
    if (step2Values) {
      setFormData((prev) => ({ ...prev, ...step2Values }))
    }
    setStep(1)
  }

  const handleEmailSubmit = (values) => {
    const payload = { ...formData, ...values }
    setFormData(payload)
    registerMutation.reset()

    registerMutation.mutate(
      {
        firstName: payload.firstName,
        instagramUsername: payload.instagramUsername,
        email: payload.email,
        password: payload.password,
      },
      {
        onSuccess: () => {
          navigate(ROUTE_PATHS.THANK_YOU, { replace: true })
        },
      }
    )
  }

  return (
    <AuthLayout
      showBack={step === 2}
      onBack={handleBackFromStep2}
    >
      {step === 1 ? (
        <CreatorApplicationForm
          defaultValues={formData}
          onSubmit={handleCreatorSubmit}
        />
      ) : (
        <EmailStepForm
          ref={emailStepRef}
          defaultValues={formData}
          onSubmit={handleEmailSubmit}
          onBack={handleBackFromStep2}
          isSubmitting={registerMutation.isPending}
          submitError={
            registerMutation.error
              ? messageFromAxiosError(registerMutation.error, 'Registration failed')
              : null
          }
        />
      )}
    </AuthLayout>
  )
}

export default Registration
