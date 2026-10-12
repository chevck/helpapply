import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'

function CtaBanner() {
  const reduce = useReducedMotion()

  return (
    <section className="border-y border-ink-line bg-ink-raised">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32"
      >
        <h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold uppercase leading-[0.98] text-paper">
          Stop guessing why your CV gets ignored
        </h2>
        <p className="mx-auto mt-5 max-w-[42ch] text-lg text-paper-dim">
          Start free. Help Apply scores your first CV at no cost.
        </p>
        <Link
          to="/get-started"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ember px-7 py-4 text-[15px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f41] active:scale-[0.98] active:translate-y-0"
        >
          Get started
          <ArrowUpRight
            size={18}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </motion.div>
    </section>
  )
}

export default CtaBanner
