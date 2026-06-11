import { cn } from '@/utils'

const TextField = ({
  label,
  id,
  hasError,
  helperText,
  className,
  wrapperClassName,
  ...props
}) => {
  const inputId = id ?? props.name

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-primary-black font-nunitosans">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-none! border px-3 py-2.5 text-lg font-outfit outline-none transition-colors placeholder:font-outfit',
          'border-neutral-light3 focus:border-black',
          hasError && 'border-error focus:border-error',
          className
        )}
        {...props}
      />
      {helperText && (
        <p className={cn('text-xs font-nunito', hasError ? 'text-error' : 'text-neutral-dark1')}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default TextField
