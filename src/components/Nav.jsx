import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import Logo from './Logo'

const LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Templates', href: '#templates' },
]

const ease = [0.16, 1, 0.3, 1]

function Nav() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const boxShadow = useTransform(
    shadowOpacity,
    (v) => `0 12px 24px -16px rgba(0,0,0,${v * 0.5})`
  )

  return (
    <motion.header
      style={{ boxShadow }}
      className="sticky top-0 z-50 border-b border-ink-line/70 bg-ink/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-18 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo className="h-7 w-7 shrink-0" />
          <span className="font-display text-xl font-semibold tracking-tight text-paper">
            Help Apply
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[15px] text-paper-dim transition-colors hover:text-paper"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="#login"
            className="text-[15px] text-paper-dim transition-colors hover:text-paper"
          >
            Log in
          </a>
          <Link
            to="/get-started"
            className="rounded-full bg-paper px-5 py-2.5 text-[15px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-[0.98] active:translate-y-0"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-paper lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.2, ease }}
            className="flex"
          >
            {open ? <X size={24} /> : <List size={24} />}
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden border-t border-ink-line/70 lg:hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <nav className="flex flex-col gap-1">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-3 text-base text-paper-dim hover:bg-ink-raised hover:text-paper"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-3 flex flex-col gap-3 border-t border-ink-line/70 pt-4">
                <a
                  href="#login"
                  className="px-2 text-base text-paper-dim hover:text-paper"
                >
                  Log in
                </a>
                <Link
                  to="/get-started"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-paper px-5 py-3 text-center text-base font-medium text-ink"
                >
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Nav
