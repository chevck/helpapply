export const BLOCK_KIND = {
  HEADING: 'heading',
  BULLET: 'bullet',
  PARAGRAPH: 'paragraph',
}

export const PLACEHOLDER = '[ADD METRIC]'

function stripInline(line) {
  return line
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(\*|_)(.+?)\1/g, '$2')
    .replace(/`/g, '')
    .trim()
}

/** Turns the rewrite's Markdown-lite into flat blocks shared by the preview, .txt and PDF. */
export function parseCvMarkdown(md) {
  const blocks = []
  for (const raw of String(md || '').split('\n')) {
    if (!raw.trim() || /^\s*-{3,}\s*$/.test(raw)) continue

    const heading = raw.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      blocks.push({ kind: BLOCK_KIND.HEADING, level: heading[1].length, text: stripInline(heading[2]) })
      continue
    }
    const bullet = raw.match(/^\s*(?:[-*+]|\d+\.)\s+(.*)$/)
    if (bullet) {
      blocks.push({ kind: BLOCK_KIND.BULLET, level: 0, text: stripInline(bullet[1]) })
      continue
    }
    blocks.push({ kind: BLOCK_KIND.PARAGRAPH, level: 0, text: stripInline(raw) })
  }
  return blocks
}

/** Splits text into segments, keeping each PLACEHOLDER as its own segment. */
export function splitPlaceholders(text) {
  return text.split(PLACEHOLDER).flatMap((part, i, parts) => {
    const segments = part ? [part] : []
    return i < parts.length - 1 ? [...segments, PLACEHOLDER] : segments
  })
}

export function toPlainText(md) {
  const lines = []
  for (const block of parseCvMarkdown(md)) {
    if (block.kind === BLOCK_KIND.HEADING) {
      if (lines.length) lines.push('')
      lines.push(block.level <= 2 ? block.text.toUpperCase() : block.text)
    } else if (block.kind === BLOCK_KIND.BULLET) {
      lines.push(`- ${block.text}`)
    } else {
      lines.push(block.text)
    }
  }
  return lines.join('\n')
}
