const FOOTER_LINKS = [
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact', href: '#' },
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
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
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
