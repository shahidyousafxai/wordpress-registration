import { appEnv } from '@/network/env'

const FOOTER_LINKS = [    
  { label: 'Terms & Conditions', href: appEnv.termsConditionsUrl },
  { label: 'Privacy Policy', href: appEnv.privacyPolicyUrl },
  { label: 'Contact', href: appEnv.contactUrl },
]

const AuthFooter = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-black py-4 smd:py-5 mt-auto">
      <div className="section-width flex gap-3 items-center justify-between">
        <p className="font-outfit text-xs smd:text-base">
          © ILOLA {year}
        </p>

        <nav className="flex items-center justify-center gap-4 smd:gap-6">
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
