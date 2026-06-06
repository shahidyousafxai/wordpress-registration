import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/Shared/Auth'
import CreatorApplicationForm from './components/CreatorApplicationForm'
import EmailStepForm from './components/EmailStepForm'
import { useRegisterMutation } from '@/network/authentication/authQueries'
import { ROUTE_PATHS } from '@/router/constants'

const Registration = () => {
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    instagramUsername: '',
    email: '',
    terms: false,
  })

  const handleCreatorSubmit = (values) => {
    setFormData((prev) => ({ ...prev, ...values }))
    setStep(2)
  }

  const handleEmailSubmit = (values) => {
    const payload = { ...formData, ...values }
    setFormData(payload)

    registerMutation.mutate(
      {
        firstName: payload.firstName,
        instagramUsername: payload.instagramUsername,
        email: payload.email,
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
      onBack={() => setStep(1)}
    >
      {step === 1 ? (
        <CreatorApplicationForm
          defaultValues={formData}
          onSubmit={handleCreatorSubmit}
        />
      ) : (
        <EmailStepForm
          defaultValues={formData}
          onSubmit={handleEmailSubmit}
          isSubmitting={registerMutation.isPending}
        />
      )}
    </AuthLayout>
  )
}

export default Registration
