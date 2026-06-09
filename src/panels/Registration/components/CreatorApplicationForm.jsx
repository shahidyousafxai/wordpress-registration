import { Link } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthHeading } from '@/components/Shared/Auth'
import TextField from '@/components/Shared/TextField'
import { creatorApplicationSchema } from '@/validations'
import { ROUTE_PATHS } from '@/router/constants'
import { cn } from '@/utils'
import InstagramIcon from '@/assets/icons/InstagramIcon'

const CreatorApplicationForm = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(creatorApplicationSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      instagramUsername: '',
      ...defaultValues,
    },
    values: {
      firstName: defaultValues.firstName ?? '',
      instagramUsername: defaultValues.instagramUsername ?? '',
    },
  })

  const [firstName, instagramUsername] = useWatch({
    control,
    name: ['firstName', 'instagramUsername'],
  })
  const isStepComplete =
    Boolean(firstName?.trim()) &&
    Boolean(instagramUsername?.replace(/^@/, '').trim())

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col py-10 px-4">
      <AuthHeading title="Creator Application" />

      <div className="mt-12 flex flex-col gap-5 items-center max-w-[365px] mx-auto w-full">

        <div className='flex flex-col gap-14 w-full'>
          <div className='flex flex-col gap-8'>
            <TextField
              {...register('firstName')}
              placeholder="First Name"
              hasError={!!errors.firstName}
              helperText={errors.firstName?.message}
              wrapperClassName="w-full"
              className="rounded-sm border-neutral-light3 py-3 font-nunito placeholder:text-neutral-dark2"
            />
            <div className="flex flex-col gap-1.5 w-full">
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary-black">
                  <InstagramIcon width={18} height={18} className="rounded-full bg-primary-black p-1 text-primary-white size-6" />
                </div>
                <span className='inline-block size-6 text-2xl font-baskervville absolute left-11 top-[23px] -translate-y-1/2 text-primary-black'>
                  @
                </span>
                <input
                  {...register('instagramUsername')}
                  placeholder="Instagram Username"
                  className={cn(
                    'w-full! rounded-none! border py-3 pl-18 pr-3 text-2xl font-baskervville outline-none transition-colors',
                    'border-neutral-light3 focus:border-black placeholder:text-neutral',
                    errors.instagramUsername && 'border-error focus:border-error'
                  )}
                />
              </div>
              {errors.instagramUsername?.message && (
                <p className="text-xs font-nunito text-error">{errors.instagramUsername.message}</p>
              )}
            </div>
          </div>
        </div>


        <button
          type="submit"
          disabled={!isStepComplete}
          className="w-full mt-17 rounded-sm bg-black py-3.5 smd:py-5.5 font-outfit text-sm smd:text-base uppercase tracking-[3px] text-white disabled:opacity-60"
        >
          Check Eligibility
        </button>

        <p className="text-center font-raleway text-lg text-black">
          Already a user?{' '}
          <Link to={ROUTE_PATHS.LOGIN} className="underline text-black font-semibold">
            Login
          </Link>
        </p>
      </div>
    </form>
  )
}

export default CreatorApplicationForm
