import { appEnv } from '@/network/env'
import { useAuthStore } from '@/store/useAuthStore'

const ThankYou = () => {
  const mediaKitUrl = useAuthStore((state) => state.mediaKitUrl)

  return (
    <div className="min-h-screen bg-primary-white px-4 md:px-6 py-8 text-center">

      <div className="flex flex-col items-center text-center">
        <img
          src="/logo.png"
          alt="ILOLA"
          className="h-12 smd:h-18 w-auto"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="mt-14 font-notodisplay text-5xl sm:text-5xl lg:text-[4rem] leading-16 font-normal text-primary-black">
          Application Received
        </h1>

        <span className="mt-10 sm:mt-18 block h-[2px] w-16 bg-primary-black" />

        <p className="mt-10 sm:mt-12 font-raleway text-base sm:text-[1.5rem] text-neutral leading-relaxed tracking-wider">
          We&apos;re reviewing your submission, but your{' '}
          {mediaKitUrl ? (
            <a
              href={mediaKitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="italic text-primary-black underline underline-offset-1 decoration-1"
            >
              Media Kit
            </a>
          ) : (
            <span className="italic text-primary-black">Media Kit</span>
          )}{' '}
          is now available!
        </p>

        <span className="mt-10 sm:mt-13 block h-[2px] w-16 bg-primary-black" />
      </div>

      <div className="mt-10 sm:mt-16 flex flex-col items-center">
        <p className="font-notodisplay text-base sm:text-3xl text-primary-black">
          We found your best content and data.
        </p>

        {mediaKitUrl ? (
          <a
            href={mediaKitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 w-[280px] max-w-[90vw] bg-error-light text-primary-white uppercase font-outfit text-sm smd:text-base tracking-[3px] inline-flex items-center justify-center py-4"
          >
            SEE MY MEDIA KIT
          </a>
        ) : (
          <span className="mt-10 w-[280px] max-w-[90vw] bg-error-light/60 text-primary-white uppercase font-outfit text-sm smd:text-base tracking-[3px] inline-flex items-center justify-center py-4 cursor-not-allowed">
            SEE MY MEDIA KIT
          </span>
        )}

        <a
          href={appEnv.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 font-outfit text-sm smd:text-base uppercase tracking-[3px] text-primary-black underline decoration-1 underline-offset-4"
        >
          NO, BROWSE AVAILABLE PRODUCTS
        </a>
      </div>
    </div>
  )
}

export default ThankYou
