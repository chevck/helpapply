import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  CircleNotch,
  CloudArrowUp,
  FileText,
  WarningCircle,
  XCircle,
} from '@phosphor-icons/react'
import { validateFile } from '../../lib/validation'

function formatFileSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function UploadStep({ file, onFileSelect, onFileRemove, onBack, onVerify, isSubmitting, submitError }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  function handleIncomingFile(candidate) {
    const message = validateFile(candidate)
    if (message) {
      setError(message)
      return
    }
    setError('')
    onFileSelect(candidate)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const candidate = e.dataTransfer.files?.[0]
    if (candidate) handleIncomingFile(candidate)
  }

  function handleInputChange(e) {
    const candidate = e.target.files?.[0]
    if (candidate) handleIncomingFile(candidate)
    e.target.value = ''
  }

  function handleRemove() {
    setError('')
    onFileRemove()
  }

  function handleVerify() {
    if (!file || isSubmitting) return
    onVerify()
  }

  return (
    <div className="flex flex-col gap-6">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-3xl font-semibold uppercase leading-[0.95] text-paper outline-none lg:text-4xl"
      >
        Upload your CV
      </h2>

      {isSubmitting ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-line bg-ink-raised py-16 text-center">
          <CircleNotch size={28} weight="bold" className="animate-spin text-ember" />
          <p className="text-[15px] font-medium text-paper">Verifying your CV</p>
          <p className="text-sm text-paper-dim">This usually takes a few seconds.</p>
        </div>
      ) : !file ? (
        <label
          htmlFor="cv-upload"
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed bg-ink-raised p-10 text-center transition-colors duration-200 ${
            isDragging ? 'border-ember bg-ember/5' : 'border-ink-line'
          }`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ember">
            <CloudArrowUp size={20} weight="bold" />
          </div>
          <p className="text-[15px] font-medium text-paper">
            Drag and drop your CV here
          </p>
          <p className="text-sm text-paper-dim">or click to browse</p>
          <p className="text-xs text-paper-dim/70">PDF only, up to 10MB</p>
          <input
            id="cv-upload"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleInputChange}
            className="sr-only"
          />
        </label>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-ink-line bg-ink-raised p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember/10 text-ember">
            <FileText size={20} weight="bold" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium text-paper">{file.name}</p>
            <p className="text-sm text-paper-dim">{formatFileSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove file"
            className="shrink-0 text-paper-dim transition-colors hover:text-paper"
          >
            <XCircle size={22} />
          </button>
        </div>
      )}

      {!isSubmitting && (error || submitError) && (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-ember-dim">
          <WarningCircle size={15} weight="bold" />
          {error || submitError}
        </p>
      )}

      <div className="mt-2 flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-full border border-ink-line px-6 py-3.5 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-paper-dim active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft size={18} weight="bold" />
          Back
        </button>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!file || isSubmitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 text-center text-[15px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f41] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          {isSubmitting && <CircleNotch size={16} weight="bold" className="animate-spin" />}
          {isSubmitting ? 'Verifying...' : 'Verify CV'}
        </button>
      </div>
    </div>
  )
}

export default UploadStep
