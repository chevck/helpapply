import { motion, useReducedMotion } from 'motion/react'
import { LinkedinLogo, InstagramLogo, XLogo } from '@phosphor-icons/react'
import Logo from './Logo'

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'CV revamp', href: '#product' },
      { label: 'ATS scoring', href: '#product' },
      { label: 'Templates', href: '#templates' },
      { label: 'Job matching', href: '#product' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Contact', href: 'mailto:hello@helpapply.co' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of service', href: '#' },
    ],
  },
]

const SOCIALS = [
  { label: 'LinkedIn', href: '#', Icon: LinkedinLogo },
  { label: 'X', href: '#', Icon: XLogo },
  { label: 'Instagram', href: '#', Icon: InstagramLogo },
]

function Footer() {
  const reduce = useReducedMotion()

  return (
    <motion.footer
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-6 pb-12 pt-20 lg:px-10"
    >
      <div className="grid grid-cols-1 gap-12 border-b border-ink-line pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-display text-xl font-semibold tracking-tight text-paper">
              Help Apply
            </span>
          </a>
          <p className="mt-4 max-w-[30ch] text-sm text-paper-dim">
            An AI agent that revamps your CV and tailors it to every job you
            apply for.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm font-medium text-paper">{col.heading}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-paper-dim transition-colors hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse items-center justify-between gap-6 pt-8 sm:flex-row">
        <p className="text-sm text-paper-dim/70">
          © 2026 Help Apply. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-paper-dim transition-colors hover:text-paper"
            >
              <Icon size={19} />
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
