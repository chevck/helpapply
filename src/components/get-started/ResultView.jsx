import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { CaretDown, WarningCircle } from '@phosphor-icons/react'
import {
  formatBand,
  formatLevel,
  getCategory,
  getCriterionLabel,
  getVerdict,
} from '../../lib/cvReport'

const ease = [0.16, 1, 0.3, 1]

function ScoreTag({ score }) {
  const color = score === 2 ? 'text-ember' : score === 0 ? 'text-ember-dim' : 'text-paper-dim'
  return <span className={`shrink-0 font-mono text-xs ${color}`}>{score}/2</span>
}

function FullBreakdown({ criteriaResults, improvementsById }) {
  const grouped = {}
  criteriaResults.forEach((item) => {
    const category = getCategory(item.id)
    if (!grouped[category]) grouped[category] = []
    grouped[category].push(item)
  })

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">{category}</p>
          <div className="mt-3 flex flex-col divide-y divide-ink-line border-t border-ink-line">
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-paper">
                    {getCriterionLabel(item.id, improvementsById)}
                  </p>
                  {item.reason && <p className="mt-0.5 text-sm text-paper-dim">{item.reason}</p>}
                </div>
                <ScoreTag score={item.score} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ResultView({ result }) {
  const [showFullBreakdown, setShowFullBreakdown] = useState(false)
  const reduce = useReducedMotion()

  const { level, yearsOfExperience, hasJobDescription, criteriaResults = [], report } = result.scoring
  const { percent, band, hardFails = [], improvements = [] } = report

  const scorePercent = Math.round(percent * 100)
  const verdict = getVerdict(percent)
  const improvementsById = Object.fromEntries(improvements.map((item) => [item.id, item]))

  const hardFailItems = hardFails.map((id) => improvementsById[id]).filter(Boolean)
  const remainingImprovements = improvements
    .filter((item) => !hardFails.includes(item.id))
    .slice(0, 5)

  const years = yearsOfExperience ? Math.round(yearsOfExperience) : null

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex flex-wrap items-end gap-4">
          <span className="font-display text-[clamp(3.5rem,9vw,5.5rem)] font-semibold leading-none text-ember">
            {scorePercent}%
          </span>
          {band && (
            <span className="mb-2 inline-flex w-fit items-center rounded-full border border-ink-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-paper-dim">
              {formatBand(band)}
            </span>
          )}
        </div>

        <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-[0.95] text-paper lg:text-4xl">
          {verdict.headline}
        </h2>
        <p className="mt-3 max-w-[56ch] text-[15px] text-paper-dim">{verdict.blurb}</p>

        {(level || years) && (
          <p className="mt-4 text-sm text-paper-dim">
            We read this as a{' '}
            {level && <span className="text-paper">{formatLevel(level)}-level</span>} profile
            {years ? ` with about ${years} years of experience` : ''}.
            {!hasJobDescription && ' This is a general check, not matched to a specific job yet.'}
          </p>
        )}
      </div>

      {hardFailItems.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-paper">
            Fix these first
          </h3>
          <div className="flex flex-col gap-3">
            {hardFailItems.map((item) => (
              <div key={item.id} className="rounded-xl border border-ember-dim/40 bg-ember-tint/20 p-4">
                <div className="flex items-start gap-3">
                  <WarningCircle size={18} weight="bold" className="mt-0.5 shrink-0 text-ember-dim" />
                  <div className="min-w-0">
                    <p className="text-[15px] font-medium text-paper">{item.title}</p>
                    {item.reason && <p className="mt-1 text-sm text-paper-dim">{item.reason}</p>}
                    {item.fixHint && <p className="mt-2 text-sm text-paper-dim">{item.fixHint}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {remainingImprovements.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-paper">
            What else to improve
          </h3>
          <div className="flex flex-col divide-y divide-ink-line border-t border-ink-line">
            {remainingImprovements.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="text-[15px] font-medium text-paper">{item.title}</p>
                  {item.reason && <p className="mt-1 text-sm text-paper-dim">{item.reason}</p>}
                  {item.fixHint && <p className="mt-1.5 text-sm text-paper-dim">{item.fixHint}</p>}
                </div>
                <span className="shrink-0 font-mono text-xs text-paper-dim/70">-{item.pointsLost}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {criteriaResults.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowFullBreakdown((v) => !v)}
            className="flex items-center gap-2 text-[15px] font-medium text-paper transition-colors hover:text-paper-dim"
          >
            {showFullBreakdown ? 'Hide full breakdown' : `View full breakdown (${criteriaResults.length} checks)`}
            <CaretDown
              size={16}
              weight="bold"
              className={`transition-transform duration-200 ${showFullBreakdown ? 'rotate-180' : ''}`}
            />
          </button>

          {showFullBreakdown && (
            <motion.div
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3, ease }}
              className="mt-5 overflow-hidden"
            >
              <FullBreakdown criteriaResults={criteriaResults} improvementsById={improvementsById} />
            </motion.div>
          )}
        </div>
      )}

      <Link
        to="/"
        className="w-fit rounded-full border border-ink-line px-6 py-3.5 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-paper-dim active:translate-y-0 active:scale-[0.98]"
      >
        Back to homepage
      </Link>
    </div>
  )
}

export default ResultView
