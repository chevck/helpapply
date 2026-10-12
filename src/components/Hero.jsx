import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import CountUp from './CountUp'

const ease = [0.16, 1, 0.3, 1]

function ScoreRing({ value = 96, reduce }) {
  const r = 26
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c

  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 64 64" className="h-14 w-14">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#28241f" strokeWidth="5" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#ff5d2a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, delay: 0.9, ease }}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <CountUp value={value} duration={1.1} delay={0.9} className="font-mono text-[13px] text-paper" />
      </div>
    </div>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        }

  return (
    <section id="top" className="relative overflow-hidden pt-14 lg:pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="lg:col-span-6">
          <motion.h1
            {...rise(0)}
            className="font-display text-[clamp(2.75rem,6vw,4.6rem)] font-semibold uppercase leading-[0.98] tracking-tight text-paper"
          >
            Apply with a CV that actually gets read.
          </motion.h1>

          <motion.p
            {...rise(0.1)}
            className="mt-6 max-w-[46ch] text-lg leading-relaxed text-paper-dim"
          >
            We score your CV against ATS standards, rewrite the weak parts,
            and tailor it to every job you apply for.
          </motion.p>

          <motion.div {...rise(0.2)} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/get-started"
              className="group flex items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-[15px] font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 hover:bg-[#ff6f41]"
            >
              Get started
              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <a
              href="#how-it-works"
              className="rounded-full border border-ink-line px-6 py-3.5 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-paper-dim active:scale-[0.98] active:translate-y-0"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8, delay: 0.15, ease },
              })}
          className="relative lg:col-span-6"
        >
          <div className="rounded-2xl border border-ink-line bg-ink-raised p-6 sm:p-9">
            <div className="-rotate-1 rounded-xl bg-paper p-6 text-ink shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)] sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink font-mono text-sm text-paper">
                  AK
                </div>
                <div className="flex-1">
                  <div className="h-3 w-32 rounded-full bg-ink/80" />
                  <div className="mt-2 h-2.5 w-44 rounded-full bg-ink/25" />
                </div>
              </div>

              <div className="mt-6 border-t border-ink/10 pt-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink/40">
                  Experience
                </p>

                <motion.p
                  {...(reduce
                    ? {}
                    : {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: { duration: 0.4, delay: 0.55 },
                      })}
                  className="mt-3 text-sm text-ink/30 line-through decoration-ink/30"
                >
                  Responsible for managing team tasks and daily operations
                </motion.p>

                <motion.div
                  {...(reduce
                    ? {}
                    : {
                        initial: { opacity: 0, x: -10 },
                        animate: { opacity: 1, x: 0 },
                        transition: { duration: 0.5, delay: 0.85, ease },
                      })}
                  className="mt-2.5 flex gap-2.5 border-l-2 border-ember pl-3"
                >
                  <p className="text-sm font-medium leading-snug text-ink">
                    Led a 6-person team and cut delivery time by 30 percent
                  </p>
                </motion.div>

                <div className="mt-5 flex flex-col gap-2">
                  <div className="h-2.5 w-full rounded-full bg-ink/10" />
                  <div className="h-2.5 w-[85%] rounded-full bg-ink/10" />
                  <div className="h-2.5 w-[70%] rounded-full bg-ink/10" />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.7, ease },
                })}
            className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-xl border border-ink-line bg-ink-raised/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur sm:left-8"
          >
            <ScoreRing value={96} reduce={reduce} />
            <div>
              <p className="text-sm font-medium text-paper">ATS compatibility</p>
              <p className="text-sm text-paper-dim">Up from 61 before revamp</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
