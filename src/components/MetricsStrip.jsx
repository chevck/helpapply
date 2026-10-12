import { motion, useReducedMotion } from 'motion/react'

const METRICS = [
  { value: '+31 pts', label: 'Average ATS score lift after a revamp' },
  { value: '11', label: 'CV structures to choose from' },
  { value: '< 2 min', label: 'To get your first ATS score' },
  { value: '60+', label: 'Job boards and ATS systems checked against' },
]

function MetricsStrip() {
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto mt-24 max-w-7xl border-y border-ink-line px-6 lg:mt-32 lg:px-10">
      <div className="grid grid-cols-2 divide-y divide-ink-line lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {METRICS.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="px-1 py-8 lg:px-8 lg:py-10"
          >
            <p className="font-mono text-3xl text-ember lg:text-4xl">
              {metric.value}
            </p>
            <p className="mt-2 max-w-[22ch] text-sm text-paper-dim">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default MetricsStrip
