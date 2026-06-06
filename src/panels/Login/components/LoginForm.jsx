import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthHeading } from '@/components/Shared/Auth'
import TextField from '@/components/Shared/TextField'
import InstagramIcon from '@/assets/icons/InstagramIcon'
import VisibilityIcon from '@/assets/icons/VisibilityIcon'
import VisibilityOffIcon from '@/assets/icons/VisibilityOffIcon'
import { loginSchema } from '@/validations'
import { ROUTE_PATHS } from '@/router/constants'
import { cn } from '@/utils'

const AUTH_INPUT_HEIGHT =
  'h-[52px] min-h-[52px] box-border text-lg font-nunito leading-none'

const LoginForm = ({ welcomeName, onSubmit, isSubmitting = false }) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const headingTitle = welcomeName ? `Welcome ${welcomeName}` : 'Welcome'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col py-10 px-4">
      <AuthHeading title={headingTitle} />

      <div className="mt-12 flex flex-col gap-5 items-center max-w-[365px] mx-auto w-full">
        <div className="flex flex-col gap-14 w-full">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded border border-primary-black px-4 py-3.5 smd:py-5.5 font-outfit text-sm smd:text-base uppercase tracking-[3px] text-primary-black"
          >
            <InstagramIcon width={18} height={18} className="rounded-full bg-primary-black p-1 text-primary-white size-6" />
            Login with Instagram
          </button>

          <div className="center">
            <span className="h-px w-10 bg-neutral-light3" />
            <span className="font-nunito text-base text-neutral whitespace-nowrap">
              or enter Instagram username
            </span>
            <span className="h-px w-10 bg-neutral-light3" />
          </div>

          <div className="flex flex-col gap-8">
            <TextField
              {...register('email')}
              placeholder="Email Address"
              hasError={!!errors.email}
              helperText={errors.email?.message}
              wrapperClassName="w-full"
              className={cn(
                AUTH_INPUT_HEIGHT,
                'rounded-none border-neutral-light3 px-3 py-0 placeholder:text-neutral-dark2'
              )}
            />

            <div className="flex flex-col gap-2 w-full">
              <fieldset
                className={cn(
                  'group relative rounded-none border px-3 transition-colors',
                  AUTH_INPUT_HEIGHT,
                  errors.password
                    ? 'border-error focus-within:border-error'
                    : 'border-neutral-light3 focus-within:border-black'
                )}
              >
                <legend
                  className={cn(
                    'absolute -top-2.5 left-3 bg-primary-white px-1 font-outfit text-sm leading-none transition-colors',
                    errors.password
                      ? 'text-error'
                      : 'text-neutral-dark1 group-focus-within:text-black'
                  )}
                >
                  Password
                </legend>
                <div className="relative flex h-full items-center">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className="h-full w-full border-0 bg-transparent pr-10 text-lg font-nunito leading-none outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-0 text-neutral-dark1 cursor-pointer"
                  >
                    {showPassword ? (
                      <VisibilityIcon width={20} height={20} className={'text-black'} />
                    ) : (
                      <VisibilityOffIcon width={20} height={20} className={'text-black'} />
                    )}
                  </button>
                </div>
              </fieldset>
              {errors.password?.message && (
                <p className="text-xs font-nunito text-error">{errors.password.message}</p>
              )}
              <Link
                to="#"
                className="self-end font-outfit text-sm text-primary-black underline underline-offset-2"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-17 rounded-sm bg-black py-3.5 smd:py-5.5 font-outfit text-sm smd:text-base uppercase tracking-[3px] text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center font-raleway text-lg text-black">
          Don&apos;t have an account?{' '}
          <Link to={ROUTE_PATHS.REGISTRATION} className="underline text-black font-semibold">
            Sign up here
          </Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
