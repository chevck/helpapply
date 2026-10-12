import { motion, useReducedMotion } from 'motion/react'

const TEMPLATES = [
  {
    name: 'Chronological',
    body: 'Work history first, newest role on top. The safest default for most ATS systems.',
    render: () => (
      <>
        <rect x="8" y="8" width="60" height="7" rx="1.5" fill="#f6f3ec" />
        <rect x="8" y="19" width="38" height="4" rx="1" fill="#c9c3b6" />
        {[30, 44, 58, 72].map((y) => (
          <g key={y}>
            <rect x="8" y={y} width="88" height="4" rx="1" fill="#c9c3b6" opacity="0.5" />
            <rect x="8" y={y + 7} width="70" height="4" rx="1" fill="#c9c3b6" opacity="0.3" />
          </g>
        ))}
      </>
    ),
  },
  {
    name: 'Functional',
    body: 'Groups experience by skill area. Useful when switching industries or roles.',
    render: () => (
      <>
        <rect x="8" y="8" width="60" height="7" rx="1.5" fill="#f6f3ec" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${20 + i * 20})`}>
            <rect x="8" width="26" height="5" rx="1" fill="#ff5d2a" opacity="0.8" />
            <rect x="8" y="9" width="88" height="4" rx="1" fill="#c9c3b6" opacity="0.5" />
            <rect x="8" y="16" width="64" height="4" rx="1" fill="#c9c3b6" opacity="0.3" />
          </g>
        ))}
      </>
    ),
  },
  {
    name: 'Hybrid',
    body: 'A narrow sidebar for skills and contact, a wide column for experience.',
    render: () => (
      <>
        <rect x="8" y="8" width="26" height="80" rx="2" fill="#141211" stroke="#28241f" />
        <rect x="13" y="16" width="16" height="4" rx="1" fill="#ff5d2a" />
        {[26, 34, 42, 50].map((y) => (
          <rect key={y} x="13" y={y} width="16" height="3" rx="1" fill="#c9c3b6" opacity="0.5" />
        ))}
        <rect x="40" y="8" width="56" height="7" rx="1.5" fill="#f6f3ec" />
        {[20, 34, 48, 62, 76].map((y) => (
          <rect key={y} x="40" y={y} width="56" height="4" rx="1" fill="#c9c3b6" opacity="0.4" />
        ))}
      </>
    ),
  },
  {
    name: 'Executive',
    body: 'Centered header, a short summary up top, built for senior and leadership roles.',
    render: () => (
      <>
        <rect x="24" y="8" width="56" height="7" rx="1.5" fill="#f6f3ec" />
        <rect x="18" y="20" width="68" height="3" rx="1" fill="#c9c3b6" opacity="0.5" />
        <rect x="24" y="26" width="56" height="3" rx="1" fill="#c9c3b6" opacity="0.5" />
        {[38, 50, 62, 74].map((y) => (
          <rect key={y} x="8" y={y} width="88" height="4" rx="1" fill="#c9c3b6" opacity="0.35" />
        ))}
      </>
    ),
  },
  {
    name: 'ATS-safe minimal',
    body: 'Single column, no tables or icons, built to parse cleanly on any tracking system.',
    render: () => (
      <>
        <rect x="8" y="8" width="48" height="6" rx="1" fill="#f6f3ec" />
        {[20, 28, 36, 44, 52, 60, 68, 76].map((y) => (
          <rect key={y} x="8" y={y} width={y % 16 === 4 ? 88 : 66} height="3" rx="1" fill="#c9c3b6" opacity="0.4" />
        ))}
      </>
    ),
  },
]

function TemplatePicker() {
  const reduce = useReducedMotion()

  return (
    <section id="templates" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[46ch]"
        >
          <h2 className="font-display text-4xl font-semibold uppercase leading-[0.95] text-paper lg:text-5xl">
            Not every job wants the same structure
          </h2>
          <p className="mt-4 text-[15px] text-paper-dim">
            If your CV is not getting through, we will suggest a different
            structure, not just different wording.
          </p>
        </motion.div>
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TEMPLATES.map((tpl, i) => (
          <motion.div
            key={tpl.name}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={reduce ? {} : { y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="w-[15.5rem] shrink-0 snap-start rounded-2xl border border-ink-line bg-ink-raised p-5 transition-colors duration-300 hover:border-paper-dim/40"
          >
            <svg
              viewBox="0 0 104 96"
              className="h-44 w-full rounded-lg border border-ink-line bg-ink"
            >
              {tpl.render()}
            </svg>
            <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-tight text-paper">
              {tpl.name}
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-snug text-paper-dim">
              {tpl.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default TemplatePicker
