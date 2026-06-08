import { forwardRef, useImperativeHandle, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthHeading } from '@/components/Shared/Auth'
import { emailStepSchema } from '@/validations'
import { cn } from '@/utils'
import { MailIcon } from '@/assets/icons/MailIcon'
import BackArrowIcon from '@/assets/icons/BackArrowIcon'
import VisibilityIcon from '@/assets/icons/VisibilityIcon'
import VisibilityOffIcon from '@/assets/icons/VisibilityOffIcon'

const AUTH_INPUT_HEIGHT =
  'h-[52px] min-h-[52px] box-border text-lg font-nunito leading-none'

function PasswordField({
  register,
  name,
  legend,
  error,
  showPassword,
  onToggleVisibility,
  autoComplete,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <fieldset
        className={cn(
          'group relative rounded-none border px-3 transition-colors',
          AUTH_INPUT_HEIGHT,
          error
            ? 'border-error focus-within:border-error'
            : 'border-neutral-light3 focus-within:border-black'
        )}
      >
        <legend
          className={cn(
            'absolute -top-2.5 left-3 bg-primary-white px-1 font-outfit text-sm leading-none transition-colors',
            error ? 'text-error' : 'text-neutral-dark1 group-focus-within:text-black'
          )}
        >
          {legend}
        </legend>
        <div className="relative flex h-full items-center">
          <input
            {...register(name)}
            type={showPassword ? 'text' : 'password'}
            autoComplete={autoComplete}
            className="h-full w-full border-0 bg-transparent pr-10 text-lg font-nunito leading-none outline-none"
          />
          <button
            type="button"
            onClick={onToggleVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-0 text-neutral-dark1 cursor-pointer"
          >
            {showPassword ? (
              <VisibilityIcon width={20} height={20} className="text-black" />
            ) : (
              <VisibilityOffIcon width={20} height={20} className="text-black" />
            )}
          </button>
        </div>
      </fieldset>
      {error?.message && (
        <p className="text-xs font-nunito text-error">{error.message}</p>
      )}
    </div>
  )
}

const EmailStepForm = forwardRef(({ defaultValues, onSubmit, onBack, isSubmitting = false }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailStepSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
      ...defaultValues,
    },
    values: {
      email: defaultValues.email ?? '',
      password: defaultValues.password ?? '',
      confirmPassword: defaultValues.confirmPassword ?? '',
      terms: defaultValues.terms ?? false,
    },
  })

  useImperativeHandle(ref, () => ({
    getStepValues: () => getValues(),
  }))

  const [email, password, confirmPassword, terms] = useWatch({
    control,
    name: ['email', 'password', 'confirmPassword', 'terms'],
  })
  const isStepComplete =
    Boolean(email?.trim()) &&
    Boolean(password) &&
    Boolean(confirmPassword) &&
    terms === true &&
    password === confirmPassword

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col justify-between space-y-16 py-10 max-base:h-[80dvh] px-4 relative">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="flex items-center gap-2 font-outfit text-sm uppercase tracking-[2px] text-primary-black cursor-pointer absolute top-2 left-3 underline"
      >
        <BackArrowIcon className="size-7" />
        Back
      </button>

      <AuthHeading
        title="Where would you like collabs sent?"
        subtitle="(We only send important info)"
      />

      <div className="flex flex-col gap-8 w-full max-w-[365px] mx-auto">
        <div className="flex flex-col gap-1.5 w-full">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-dark1">
              <MailIcon width={24} height={24} />
            </span>
            <input
              {...register('email')}
              placeholder="Email Address"
              autoComplete="email"
              className={cn(
                'w-full! rounded-none! border py-3 pl-10 pr-3 text-2xl font-baskervville outline-none transition-colors',
                'border-neutral-light3 focus:border-black placeholder:text-neutral',
                errors.email && 'border-error focus:border-error'
              )}
            />
          </div>
          {errors.email?.message && (
            <p className="text-xs font-nunito text-error">{errors.email.message}</p>
          )}
        </div>

        <PasswordField
          register={register}
          name="password"
          legend="Password"
          error={errors.password}
          showPassword={showPassword}
          onToggleVisibility={() => setShowPassword((prev) => !prev)}
          autoComplete="new-password"
        />

        <PasswordField
          register={register}
          name="confirmPassword"
          legend="Confirm Password"
          error={errors.confirmPassword}
          showPassword={showConfirmPassword}
          onToggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
          autoComplete="new-password"
        />
      </div>

      <div className="w-full max-w-[365px] mx-auto space-y-5.5">
        <button
          type="submit"
          disabled={!isStepComplete || isSubmitting}
          className="w-full rounded-sm bg-black py-3.5 smd:py-5.5 font-outfit text-base uppercase tracking-[3px] text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account...' : 'Confirm'}
        </button>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('terms')}
            className="mt-1 size-4 shrink-0 accent-primary-black"
          />
          <span className="font-raleway text-sm leading-relaxed text-black smd:text-base">
            I agree to ILOLA's{' '}
            <a href="#" className="underline">T&C</a>,{' '}
            <a href="#" className="underline">Privacy Policy</a>
            {' '}& to receive communication relevant to ILOLA™.
          </span>
        </label>
        {errors.terms?.message && (
          <p className="text-xs font-nunito text-error">{errors.terms.message}</p>
        )}
      </div>
    </form>
  )
})

EmailStepForm.displayName = 'EmailStepForm'

export default EmailStepForm
