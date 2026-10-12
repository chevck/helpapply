import { motion, useReducedMotion } from 'motion/react'

function Testimonial() {
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
      >
        <div className="lg:col-span-4">
          <div className="flex aspect-square w-32 items-center justify-center rounded-2xl border border-ink-line bg-ink-raised sm:w-40">
            <span className="font-display text-4xl font-semibold text-ember sm:text-5xl">
              MF
            </span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="font-display text-2xl font-medium leading-tight text-paper sm:text-3xl lg:text-4xl">
            I had applied to forty roles with no replies. Two weeks after
            switching to the tailored CVs, I had three interviews booked.
          </p>
          <p className="mt-6 text-[15px] text-paper-dim">
            Marisol Fernandez
            <span className="text-paper-dim/60"> - Supply chain analyst</span>
          </p>
        </div>
      </motion.div>
    </section>
  )
}

export default Testimonial
