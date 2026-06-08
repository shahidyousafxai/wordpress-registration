const ThankYou = () => (
  <div className="min-h-screen bg-primary-white px-4 md:px-6 py-12 text-center">

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

    <div className="mt-16 flex flex-col items-center">
      <p className="font-notodisplay text-2xl md:text-3xl text-primary-black">
        We found your best content and data.
      </p>

      <a
        href="#"
        className="mt-10 w-[280px] max-w-[90vw] bg-error-light text-primary-white uppercase font-outfit text-sm smd:text-base tracking-[3px] inline-flex items-center justify-center py-4"
      >
        SEE MY MEDIA KIT
      </a>

      <a
        href="#"
        className="mt-8 font-outfit text-sm smd:text-base uppercase tracking-[3px] text-primary-black underline decoration-1 underline-offset-4"
      >
        NO, BROWSE AVAILABLE PRODUCTS
      </a>
    </div>
  </div>
)

export default ThankYou
