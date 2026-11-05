import { useMemo } from 'react'
import {
  BLOCK_KIND,
  PLACEHOLDER,
  parseCvMarkdown,
  splitPlaceholders,
} from '../lib/cvDocument'

const HEADING_TAG = { 1: 'h2', 2: 'h3' }
const HEADING_CLASS = {
  1: 'font-display text-3xl font-semibold uppercase leading-[0.95] text-paper',
  2: 'mt-4 font-display text-xl font-semibold uppercase tracking-tight text-paper',
}
const HEADING_CLASS_DEFAULT = 'mt-2 text-[15px] font-semibold text-paper'

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

function CvDocument({ markdown, className = '' }) {
  const blocks = useMemo(() => parseCvMarkdown(markdown), [markdown])

  return (
    <article
      className={`flex flex-col gap-3 rounded-xl border border-ink-line p-6 [overflow-wrap:anywhere] ${className}`}
    >
      {renderBlocks(blocks)}
    </article>
  )
}

export default CvDocument
