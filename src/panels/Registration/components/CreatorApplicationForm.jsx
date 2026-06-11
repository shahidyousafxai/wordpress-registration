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

      <div className="mt-20 smd:mt-28 flex flex-col gap-5 items-center max-w-[365px] mx-auto w-full">
        <div className='flex flex-col gap-8 w-full'>
          <TextField
            {...register('firstName')}
            placeholder="First Name"
            hasError={!!errors.firstName}
            helperText={errors.firstName?.message}
            wrapperClassName="w-full"
            className="rounded-sm border-neutral-light3 py-3 font-outfit placeholder:text-neutral-dark1"
          />
          <div className="flex flex-col gap-1.5 w-full">
            <div className="relative">

              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary-black flex items-center gap-2">
                <InstagramIcon width={18} height={18} className="rounded-full bg-primary-black p-1 text-primary-white size-6" />
                <span className='inline-block text-xl mb-0.5 leading-5 font-baskervville text-primary-black'>
                  @
                </span>
              </div>
              <input
                {...register('instagramUsername')}
                placeholder="Instagram Username"
                className={cn(
                  'w-full! rounded-none! border py-3 pl-16 pr-3 text-2xl font-baskervville outline-none transition-colors',
                  'border-neutral-light3 focus:border-black placeholder:text-neutral-dark3 placeholder:tracking-[1px] placeholder:font-light',
                  errors.instagramUsername && 'border-error focus:border-error'
                )}
              />
            </div>
            {errors.instagramUsername?.message && (
              <p className="text-xs font-nunito text-error">{errors.instagramUsername.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isStepComplete}
          className="w-full mt-10 rounded-sm bg-secondary-lightMintGreen py-3.5 smd:py-5.5 font-baskervville text-sm smd:text-base uppercase tracking-[3px] text-black disabled:opacity-60 border border-black"
        >
          Check Eligibility
        </button>

        <p className="text-center font-raleway text-lg text-black mt-5">
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
