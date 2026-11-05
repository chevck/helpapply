import { useEffect, useState } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { getSavedCv } from '../../lib/api'
import { useToast } from '../../hooks/useToast'
import CvDocument from '../CvDocument'

const rowButton =
  'rounded-full border border-ink-line px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-paper-dim'

function SavedCvViewer({ id, onBack, onDownloadText, onDownloadPdf }) {
  const [savedCv, setSavedCv] = useState(null)
  const toast = useToast()

  useEffect(() => {
    const controller = new AbortController()
    getSavedCv(id, { signal: controller.signal })
      .then((response) => setSavedCv(response.data.savedCv))
      .catch((err) => {
        if (err.name === 'AbortError') return
        toast.error(err.message)
        onBack()
      })
    return () => controller.abort()
  }, [id, onBack, toast])

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-2 text-[15px] font-medium text-paper-dim transition-colors hover:text-paper"
      >
        <ArrowLeft size={16} weight="bold" />
        Back to your CVs
      </button>

      {savedCv ? (
        <>
          <h2 className="font-display text-2xl font-semibold text-paper">{savedCv.title}</h2>
          <CvDocument markdown={savedCv.content} />
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => onDownloadText(savedCv)} className={rowButton}>
              Download .txt
            </button>
            <button type="button" onClick={() => onDownloadPdf(savedCv)} className={rowButton}>
              Download PDF
            </button>
          </div>
        </>
      ) : (
        <p className="text-[15px] text-paper-dim">Loading...</p>
      )}
    </div>
  )
}

export default SavedCvViewer
