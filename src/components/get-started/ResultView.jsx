import { Link } from 'react-router-dom'
import { CircleNotch, WarningCircle } from '@phosphor-icons/react'
import { formatBand, formatLevel, getVerdict } from '../../lib/cvReport'

function FixDetails({ fix }) {
  return (
    <div className="min-w-0">
      <p className="text-[15px] font-medium text-paper">{fix.title}</p>
      {fix.reason && <p className="mt-1 text-sm text-paper-dim">{fix.reason}</p>}
      {fix.fixHint && <p className="mt-1.5 text-sm text-paper-dim">{fix.fixHint}</p>}
    </div>
  )
}

function ResultView({ result, onUpgrade, isUpgrading }) {
  const { score, band, level, yearsOfExperience, strengths, fixes } = result.review
  const verdict = getVerdict(score / 100)
  const years = yearsOfExperience ? Math.round(yearsOfExperience) : null
  const mustFix = fixes.filter((fix) => fix.mustFix)
  const rest = fixes.filter((fix) => !fix.mustFix)

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex flex-wrap items-end gap-4">
          <span className="font-display text-[clamp(3.5rem,9vw,5.5rem)] font-semibold leading-none text-ember">
            {score}%
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
          </p>
        )}
      </div>

      {strengths.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-paper">
            What we liked
          </h3>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-paper-dim">
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      )}

      {mustFix.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-paper">
            Fix these first
          </h3>
          <div className="flex flex-col gap-3">
            {mustFix.map((fix) => (
              <div key={fix.title} className="rounded-xl border border-ember-dim/40 bg-ember-tint/20 p-4">
                <div className="flex items-start gap-3">
                  <WarningCircle size={18} weight="bold" className="mt-0.5 shrink-0 text-ember-dim" />
                  <FixDetails fix={fix} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl font-semibold uppercase tracking-tight text-paper">
            What else to improve
          </h3>
          <div className="flex flex-col divide-y divide-ink-line border-t border-ink-line">
            {rest.map((fix) => (
              <div key={fix.title} className="py-4">
                <FixDetails fix={fix} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onUpgrade}
          disabled={isUpgrading}
          className="flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 text-center text-[15px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f41] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          {isUpgrading && <CircleNotch size={16} weight="bold" className="animate-spin" />}
          {isUpgrading ? 'Updating your CV…' : 'Update my CV'}
        </button>
        <Link
          to="/"
          className="w-fit rounded-full border border-ink-line px-6 py-3.5 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-paper-dim active:translate-y-0 active:scale-[0.98]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}

export default ResultView
