import { motion, useReducedMotion } from 'motion/react'
import {
  UploadSimple,
  ChartBar,
  PencilSimple,
  PaperPlaneTilt,
} from '@phosphor-icons/react'

const STEPS = [
  {
    num: '01',
    icon: UploadSimple,
    title: 'Upload your CV',
    body: 'Any format, any layout. We read it in seconds and keep the original facts intact.',
  },
  {
    num: '02',
    icon: ChartBar,
    title: 'Get your ATS score',
    body: 'See exactly what is blocking your CV from passing applicant tracking systems.',
  },
  {
    num: '03',
    icon: PencilSimple,
    title: 'Approve the rewrite',
    body: 'A clearer structure and stronger phrasing, built from a template that fits your background.',
  },
  {
    num: '04',
    icon: PaperPlaneTilt,
    title: 'Apply with a tailored CV',
    body: 'Each application gets a version repositioned for that specific role, not a generic copy.',
  },
]

function HowItWorks() {
  const reduce = useReducedMotion()

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[40ch]"
      >
        <h2 className="font-display text-4xl font-semibold uppercase leading-[0.95] text-paper lg:text-5xl">
          From draft to applied
        </h2>
      </motion.div>

      <div className="mt-14 divide-y divide-ink-line border-t border-ink-line">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.num}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 items-start gap-4 py-9 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 lg:grid-cols-[5rem_auto_1fr] lg:gap-10"
            >
              <span className="font-mono text-base text-paper-dim/70 lg:text-lg">
                {step.num}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ember transition-colors duration-300 group-hover:border-ember group-hover:bg-ember/10">
                <Icon size={20} weight="bold" />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-paper">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[52ch] text-[15px] text-paper-dim">
                  {step.body}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default HowItWorks
