import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthHeading } from '@/components/Shared/Auth'
import TextField from '@/components/Shared/TextField'
import { creatorApplicationSchema } from '@/validations'
import { cn } from '@/utils'
import InstagramIcon from '@/assets/icons/InstagramIcon'

const CreatorApplicationForm = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(creatorApplicationSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      instagramUsername: '',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col py-10">
      <AuthHeading title="Creator Application" />

      <div className="mt-12 flex flex-col gap-5 items-center max-w-[365px] mx-auto w-full">

        <div className='flex flex-col gap-14 w-full'>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded border border-primary-black px-4 py-5.5 font-outfit text-base uppercase tracking-[3px] text-primary-black"
          >
            <div className="pointer-events-none text-primary-black">
              <InstagramIcon width={18} height={18} className="rounded-full bg-primary-black p-1 text-primary-white size-6" />
            </div>
            Register with Instagram
          </button>

          <div className="center gap-2">
            <span className="h-px w-10 bg-neutral-light3" />
            <span className="font-nunito text-base text-neutral whitespace-nowrap">
              or enter Instagram username
            </span>
            <span className="h-px w-10 bg-neutral-light3" />
          </div>

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
                    'indent-9 w-full! rounded-none! border py-3 pl-10 pr-3 text-2xl font-baskervville outline-none transition-colors',
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
          className="w-full mt-17 rounded-sm bg-black py-5.5 font-outfit text-base uppercase tracking-[3px] text-white"
        >
          Check Eligibility
        </button>

        <p className="text-center font-raleway text-lg text-black">
          Already a user?{' '}
          <button type="button" className="underline text-black font-semibold">
            Login
          </button>
        </p>
      </div>
    </form>
  )
}

export default CreatorApplicationForm
