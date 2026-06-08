import { appEnv } from '@/network/env'
import { TermsConditionsLink } from './TermsConditionsPicker'

const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: appEnv.privacyPolicyUrl },
  { label: 'Contact', href: appEnv.contactUrl },
]

const AuthFooter = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-black py-4 smd:py-5 mt-auto">
      <div className="section-width flex flex-col items-center gap-3 smd:flex-row smd:items-center smd:justify-between">
        <p className="font-outfit text-xs smd:text-base">
          © ILOLA {year}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-4 smd:gap-6">
          <TermsConditionsLink
            className="font-outfit text-xs smd:text-base hover:underline"
            placement="top"
          >
            Terms &amp; Conditions
          </TermsConditionsLink>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-outfit text-xs smd:text-base hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default AuthFooter
