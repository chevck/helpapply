import { useMemo } from 'react'
import { ArrowLeft, CircleNotch } from '@phosphor-icons/react'
import { useToast } from '../../hooks/useToast'
import {
  BLOCK_KIND,
  PLACEHOLDER,
  parseCvMarkdown,
  splitPlaceholders,
} from '../../lib/cvDocument'
import { downloadPdf, downloadText } from '../../lib/cvDownload'

const HEADING_TAG = { 1: 'h2', 2: 'h3' }
const HEADING_CLASS = {
  1: 'font-display text-3xl font-semibold uppercase leading-[0.95] text-paper',
  2: 'mt-4 font-display text-xl font-semibold uppercase tracking-tight text-paper',
}
const HEADING_CLASS_DEFAULT = 'mt-2 text-[15px] font-semibold text-paper'

const secondaryButton =
  'rounded-full border border-ink-line px-5 py-3 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-paper-dim active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40'

function Inline({ text }) {
  return splitPlaceholders(text).map((segment, i) =>
    segment === PLACEHOLDER ? (
      <mark key={i} className="rounded bg-ember/15 px-1 text-ember">
        {segment}
      </mark>
    ) : (
      <span key={i}>{segment}</span>
    ),
  )
}

function renderBlocks(blocks) {
  const out = []
  let bullets = []
  const flush = () => {
    if (!bullets.length) return
    out.push(
      <ul key={`ul-${out.length}`} className="flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-paper-dim">
        {bullets}
      </ul>,
    )
    bullets = []
  }

  blocks.forEach((block, i) => {
    const key = `${i}-${block.kind}`
    if (block.kind === BLOCK_KIND.BULLET) {
      bullets.push(
        <li key={key}>
          <Inline text={block.text} />
        </li>,
      )
      return
    }
    flush()
    if (block.kind === BLOCK_KIND.HEADING) {
      const Tag = HEADING_TAG[block.level] ?? 'h4'
      out.push(
        <Tag key={key} className={HEADING_CLASS[block.level] ?? HEADING_CLASS_DEFAULT}>
          <Inline text={block.text} />
        </Tag>,
      )
    } else {
      out.push(
        <p key={key} className="text-[15px] text-paper-dim">
          <Inline text={block.text} />
        </p>,
      )
    }
  })
  flush()
  return out
}

function CvPreview({ cv, fileName, onBack, onRegenerate, isRegenerating }) {
  const toast = useToast()
  const blocks = useMemo(() => parseCvMarkdown(cv), [cv])

  async function handlePdf() {
    try {
      await downloadPdf(cv, fileName)
    } catch {
      toast.error("We couldn't create the PDF. Try the text download.")
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <button
        type="button"
        onClick={onBack}
        disabled={isRegenerating}
        className="flex w-fit items-center gap-2 text-[15px] font-medium text-paper-dim transition-colors hover:text-paper disabled:opacity-50 disabled:hover:text-paper-dim"
      >
        <ArrowLeft size={16} weight="bold" />
        Back to review
      </button>

      <p className="text-sm text-paper-dim">
        Replace each highlighted {PLACEHOLDER} with a real number before you send it.
      </p>

      <article
        className={`flex flex-col gap-3 rounded-xl border border-ink-line p-6 transition-opacity [overflow-wrap:anywhere] ${
          isRegenerating ? 'opacity-50' : ''
        }`}
      >
        {renderBlocks(blocks)}
      </article>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onRegenerate} disabled={isRegenerating} className={`${secondaryButton} flex items-center gap-2`}>
          {isRegenerating && <CircleNotch size={16} weight="bold" className="animate-spin" />}
          {isRegenerating ? 'Regenerating...' : 'Regenerate'}
        </button>
        <button type="button" onClick={() => downloadText(cv, fileName)} disabled={isRegenerating} className={secondaryButton}>
          Download .txt
        </button>
        <button type="button" onClick={handlePdf} disabled={isRegenerating} className={secondaryButton}>
          Download PDF
        </button>
      </div>
    </div>
  )
}

export default CvPreview
