import { BLOCK_KIND, parseCvMarkdown, toPlainText } from './cvDocument'

export function fileStem(fileName) {
  return String(fileName || '').replace(/\.[^.]+$/, '') || 'cv'
}

function baseName(fileName) {
  return `${fileStem(fileName)}-updated`
}

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.click()
  URL.revokeObjectURL(url)
}

export function downloadText(md, fileName) {
  const blob = new Blob([toPlainText(md)], { type: 'text/plain;charset=utf-8' })
  saveBlob(blob, `${baseName(fileName)}.txt`)
}

const MARGIN = 48
const HEADING_STYLE = {
  1: { size: 16, before: 0 },
  2: { size: 12, before: 6 },
}
const HEADING_DEFAULT = { size: 11, before: 0 }
const BODY_SIZE = 10.5
const BULLET_INDENT = 12

export async function downloadPdf(md, fileName) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let y = MARGIN

  for (const block of parseCvMarkdown(md)) {
    const isHeading = block.kind === BLOCK_KIND.HEADING
    const isBullet = block.kind === BLOCK_KIND.BULLET
    const style = isHeading ? (HEADING_STYLE[block.level] ?? HEADING_DEFAULT) : null
    const size = style ? style.size : BODY_SIZE
    const indent = isBullet ? BULLET_INDENT : 0
    const lineHeight = size * 1.35

    doc.setFont('helvetica', isHeading ? 'bold' : 'normal')
    doc.setFontSize(size)
    if (style) y += style.before

    const text = isBullet ? `- ${block.text}` : block.text
    const lines = doc.splitTextToSize(text, pageWidth - MARGIN * 2 - indent)
    for (const line of lines) {
      if (y + lineHeight > pageHeight - MARGIN) {
        doc.addPage()
        y = MARGIN
      }
      doc.text(line, MARGIN + indent, y + size)
      y += lineHeight
    }
    y += isHeading ? 2 : 3
  }

  doc.save(`${baseName(fileName)}.pdf`)
}
