const ThankYou = () => (
  <div className="min-h-screen bg-primary-white px-6 py-12 text-center">

    <div className="flex flex-col items-center text-center">
      <img
        src="/logo.png"
        alt="ILOLA"
        className="h-12 smd:h-18 w-auto"
      />
    </div>

    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="mt-14 font-notodisplay text-3xl md:text-5xl lg:text-[4rem] font-light text-primary-black">
        Application Received
      </h1>

      <p className="mt-12 lg:mt-18 max-w-5xl font-raleway text-2xl md:text-4xl lg:text-[3rem] text-neutral leading-relaxed tracking-wider">
        We&apos;re reviewing your submission, but your{' '}
        <a
          href="#"
          className="italic text-primary-black underline underline-offset-2 decoration-2"
        >
          Media Kit
        </a>{' '}
        is now available!
      </p>

      <span className="mt-5 block h-[2px] w-[18%] min-w-[72px] bg-primary-black" />
    </div>
  </div>
)

export default ThankYou
