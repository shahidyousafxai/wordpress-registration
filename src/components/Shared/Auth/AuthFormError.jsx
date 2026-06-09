const AuthFormError = ({ message }) => {
  if (!message) return null

  return (
    <div
      role="alert"
      className="rounded-sm bg-secondary-rustyRedLight px-4 py-3 font-nunito text-sm leading-relaxed text-error"
    >
      {message}
    </div>
  )
}

export default AuthFormError
