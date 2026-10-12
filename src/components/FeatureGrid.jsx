import { motion, useReducedMotion } from 'motion/react'
import {
  CheckCircle,
  Columns,
  MagnifyingGlass,
  Target,
} from '@phosphor-icons/react'

function Cell({ className, children, delay, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={reduce ? {} : { y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-ink-line transition-colors duration-300 hover:border-paper-dim/40 ${className}`}
    >
      {children}
    </motion.div>
  )
}

function FeatureGrid() {
  const reduce = useReducedMotion()

  return (
    <section id="product" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[46ch]"
      >
        <h2 className="font-display text-4xl font-semibold uppercase leading-[0.95] text-paper lg:text-5xl">
          What Help Apply does
        </h2>
        <p className="mt-4 text-[15px] text-paper-dim">
          One agent, five jobs. Everything it does serves the same goal:
          getting your application in front of a person.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <Cell reduce={reduce} delay={0} className="min-h-[22rem] bg-ink-raised sm:col-span-2 lg:col-span-3">
          <div className="pointer-events-none absolute -right-6 -top-6 w-[70%] rotate-3 opacity-60">
            <div className="flex flex-col gap-2.5 rounded-xl border border-ink-line bg-ink p-5">
              <div className="h-2.5 w-2/3 rounded-full bg-paper-dim/25 line-through" />
              <div className="h-2.5 w-1/2 rounded-full bg-paper-dim/15" />
              <div className="h-2.5 w-full rounded-full bg-ember/60" />
              <div className="h-2.5 w-5/6 rounded-full bg-paper-dim/15" />
            </div>
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-ink-raised via-ink-raised/70 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-7">
            <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-paper">
              Rewrites that keep your voice
            </h3>
            <p className="mt-2 max-w-[38ch] text-[15px] text-paper-dim">
              We restructure sentences and tighten phrasing without inventing
              experience you do not have.
            </p>
          </div>
        </Cell>

        <Cell reduce={reduce} delay={0.06} className="min-h-[22rem] sm:col-span-2 lg:col-span-3">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 85% 15%, rgba(255,93,42,0.22), transparent 60%), #141211',
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-7">
            <CheckCircle size={30} weight="fill" className="text-ember" />
            <div>
              <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-paper">
                Built for applicant tracking systems
              </h3>
              <p className="mt-2 max-w-[40ch] text-[15px] text-paper-dim">
                Checked against formatting rules, keyword parsing, and the
                section labels most ATS platforms expect.
              </p>
            </div>
          </div>
        </Cell>

        <Cell reduce={reduce} delay={0.12} className="min-h-[14rem] bg-ink-raised p-7 lg:col-span-2">
          <Columns size={26} weight="bold" className="text-ember" />
          <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-tight text-paper">
            Match structure to the role
          </h3>
          <p className="mt-2 text-[15px] text-paper-dim">
            Chronological, functional, or hybrid, picked to fit your
            experience.
          </p>
        </Cell>

        <Cell reduce={reduce} delay={0.18} className="min-h-[14rem] bg-ink-raised p-7 lg:col-span-2">
          <MagnifyingGlass size={26} weight="bold" className="text-ember" />
          <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-tight text-paper">
            Jobs that fit your background
          </h3>
          <p className="mt-2 text-[15px] text-paper-dim">
            We scan postings and surface roles that match your skills and
            seniority.
          </p>
        </Cell>

        <Cell reduce={reduce} delay={0.24} className="min-h-[14rem] bg-ink-raised p-7 lg:col-span-2">
          <Target size={26} weight="bold" className="text-ember" />
          <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-tight text-paper">
            Tailored for each application
          </h3>
          <p className="mt-2 text-[15px] text-paper-dim">
            Small, honest adjustments that position you for that specific
            posting.
          </p>
        </Cell>
      </div>
    </section>
  )
}

export default FeatureGrid
