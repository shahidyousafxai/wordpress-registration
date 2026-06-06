const AuthHeading = ({ title, subtitle }) => (
  <div className="text-center">
    <h1 className="font-notodisplay text-2xl sm:text-3xl lg:text-[3rem] px-5 font-light text-primary-black relative after:content-[''] after:block after:w-[15%] after:h-[2px] after:bg-primary-black after:mx-auto after:mt-3">
      {title}
    </h1>
    {subtitle && (
      <p className="mt-3 font-raleway text-base smd:text-xl text-neutral">{subtitle}</p>
    )}
  </div>
)

export default AuthHeading
