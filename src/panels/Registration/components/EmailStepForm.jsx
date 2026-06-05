import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthHeading } from '@/components/Shared/Auth'
import { emailStepSchema } from '@/validations'
import { cn } from '@/utils'
import { MailIcon } from '@/assets/icons/MailIcon'

const EmailStepForm = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailStepSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      terms: false,
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col justify-between py-10">
      <AuthHeading
        title="Where would you like collabs sent?"
        subtitle="(We only send important info)"
      />

      <div className="flex flex-col gap-1.5 w-full max-w-[365px] mx-auto">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-dark1">
            <MailIcon width={24} height={24} />
          </span>
          <input
            {...register('email')}
            placeholder="Email Address"
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

      <div className='w-full max-w-[365px] mx-auto space-y-5.5'>
        <button
          type="submit"
          className="w-full rounded-sm bg-black py-5.5 font-outfit text-base uppercase tracking-[3px] text-white"
        >
          Confirm
        </button>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('terms')}
            className="mt-1 size-4 shrink-0 accent-primary-black"
          />
          <span className="font-raleway text-sm leading-relaxed text-black smd:text-base">
            I agree to ILOLA&apos;s{' '}
            <a href="#" className="underline">T&amp;C</a>,{' '}
            <a href="#" className="underline">Privacy Policy</a>
            {' '}&amp; to receive emails &amp; texts relevant to ILOLA™.
          </span>
        </label>

      </div>
    </form>
  )
}

export default EmailStepForm
