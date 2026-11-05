import { Link } from 'react-router-dom'

const rowButton =
  'rounded-full border border-ink-line px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-paper-dim disabled:pointer-events-none disabled:opacity-40'

function levelLabel(level) {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

function SavedCvList({ savedCvs, busyId, onOpen, onDownloadText, onDownloadPdf, onDelete }) {
  if (savedCvs.length === 0) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-ink-line p-6">
        <p className="text-[15px] text-paper-dim">No saved CVs yet.</p>
        <Link to="/get-started" className="text-[15px] font-medium text-paper underline underline-offset-4">
          Update your CV
        </Link>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {savedCvs.map((savedCv) => {
        const busy = busyId === savedCv.id
        return (
          <li
            key={savedCv.id}
            className="flex flex-col gap-4 rounded-xl border border-ink-line p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate text-[16px] font-medium text-paper">{savedCv.title}</p>
              <p className="text-sm text-paper-dim">
                {new Date(savedCv.createdAt).toLocaleDateString()} · {levelLabel(savedCv.level)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => onOpen(savedCv.id)} disabled={busy} className={rowButton}>
                Open
              </button>
              <button type="button" onClick={() => onDownloadText(savedCv)} disabled={busy} className={rowButton}>
                Download .txt
              </button>
              <button type="button" onClick={() => onDownloadPdf(savedCv)} disabled={busy} className={rowButton}>
                Download PDF
              </button>
              <button type="button" onClick={() => onDelete(savedCv)} disabled={busy} className={rowButton}>
                Delete
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default SavedCvList
