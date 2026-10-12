import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import CountUp from './CountUp'

const CHANGES = [
  'Keyword gaps closed against the job description',
  'Dates, titles, and section labels standardized',
  'Bullet points rewritten for impact, not just duties',
]

const numberClass =
  'font-display text-[clamp(3.5rem,9vw,7rem)] font-semibold leading-none'

function ScoreShowcase() {
  const reduce = useReducedMotion()

  return (
    <section className="border-y border-ink-line bg-ink-raised">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-5 font-mono text-paper-dim">
            <CountUp value={58} duration={1} className={`${numberClass} text-paper-dim/60`} />
            <ArrowRight size={32} className="text-ember" />
            <CountUp value={94} duration={1.3} delay={0.2} className={`${numberClass} text-ember`} />
          </div>
          <p className="mt-4 max-w-[42ch] text-[15px] text-paper-dim">
            Average ATS compatibility score, measured before and after a
            Help Apply revamp on the same CV.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="flex flex-col justify-center gap-6 border-t border-ink-line pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
        >
          {CHANGES.map((change) => (
            <motion.p
              key={change}
              variants={{
                hidden: { opacity: 0, x: -12 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="text-lg leading-snug text-paper"
            >
              {change}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ScoreShowcase
