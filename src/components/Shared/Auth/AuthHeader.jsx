import BackArrowIcon from "@/assets/icons/BackArrowIcon"


const AuthHeader = ({ showBack = false, onBack }) => (
  <header className="w-full px-4 smd:px-8 py-6 smd:py-8">
    <div className="section-width grid grid-cols-[2.5rem_1fr_2.5rem] items-start smd:grid-cols-[3rem_1fr_3rem]">
      <div className="flex items-center justify-start">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="text-primary-black cursor-pointer"
          >
            <BackArrowIcon className="size-6 smd:size-7" />
          </button>
        ) : (
          <span className="size-6 smd:size-7" />
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <img
          src="/logo.png"
          alt="ILOLA"
          className="h-12 smd:h-18 w-auto"
        />
      </div>

      <span className="size-6 smd:size-7" />
    </div>
  </header>
)

export default AuthHeader
