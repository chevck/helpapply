import { ArrowLeft, CircleNotch } from '@phosphor-icons/react'
import { useToast } from '../../hooks/useToast'
import { PLACEHOLDER } from '../../lib/cvDocument'
import { downloadPdf, downloadText } from '../../lib/cvDownload'
import CvDocument from '../CvDocument'

const secondaryButton =
  'rounded-full border border-ink-line px-5 py-3 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-paper-dim active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40'

const primaryButton =
  'rounded-full bg-paper px-5 py-3 text-[15px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40'

function CvPreview({ cv, fileName, onBack, onRegenerate, isRegenerating, onSave, isSaving }) {
  const toast = useToast()
  const busy = isRegenerating || isSaving

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

      <CvDocument markdown={cv} className={`transition-opacity ${isRegenerating ? 'opacity-50' : ''}`} />

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onSave} disabled={busy} className={`${primaryButton} flex items-center gap-2`}>
          {isSaving && <CircleNotch size={16} weight="bold" className="animate-spin" />}
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onRegenerate} disabled={busy} className={`${secondaryButton} flex items-center gap-2`}>
          {isRegenerating && <CircleNotch size={16} weight="bold" className="animate-spin" />}
          {isRegenerating ? 'Regenerating...' : 'Regenerate'}
        </button>
        <button type="button" onClick={() => downloadText(cv, fileName)} disabled={busy} className={secondaryButton}>
          Download .txt
        </button>
        <button type="button" onClick={handlePdf} disabled={busy} className={secondaryButton}>
          Download PDF
        </button>
      </div>
    </div>
  )
}

export default CvPreview
