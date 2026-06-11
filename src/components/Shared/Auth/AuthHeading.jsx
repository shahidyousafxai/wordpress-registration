const AuthHeading = ({ title, subtitle }) => (
  <div className="text-center space-y-8">
    <h1 className="font-notodisplay text-3xl smd:text-4xl lg:text-[3rem] px-5 font-light text-primary-black relative after:content-[''] after:block after:w-[15%] after:h-[2px] after:bg-primary-black after:mx-auto after:mt-3">
      {title}
    </h1>
    {subtitle && (
      <p className="font-raleway text-base smd:text-xl text-neutral">{subtitle}</p>
    )}
  </div>
)

export default AuthHeading
