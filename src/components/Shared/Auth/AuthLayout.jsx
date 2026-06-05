import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'
import forgotPasswordImage from '@/assets/images/forgotPasswordImage.svg'

const AuthLayout = ({ children, showBack = false, onBack }) => (
  <div className="min-h-screen flex flex-col bg-primary-white w-full max-w-[1296px] mx-auto">
    <AuthHeader showBack={showBack} onBack={onBack} />

    <main className="flex-1 pb-8">
      <div className=" flex flex-col overflow-hidden bg-primary-white md:flex-row gap-10">
        <div className="relative mx-auto w-full max-w-[500px] shrink-0 md:mx-0 md:min-h-[540px]">
          <img
            src={forgotPasswordImage}
            alt=""
            className="h-full w-full max-w-[500px] object-cover object-top"
          />
        </div>

        <div className="flex min-h-[480px] w-full max-w-[756px] flex-1 flex-col bg-primary-white border border-neutral-light1 rounded-lg md:min-h-[540px]">
          {children}
        </div>
      </div>
    </main>

    <AuthFooter />
  </div>
)

export default AuthLayout
