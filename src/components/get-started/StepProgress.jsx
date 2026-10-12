const LABELS = ['Contact info', 'Upload your CV']

function StepProgress({ step }) {
  return (
    <div aria-live="polite" className="mb-10">
      <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">
        Step {step} of 2 - {LABELS[step - 1]}
      </p>
      <div className="mt-3 flex gap-2">
        {[1, 2].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              n <= step ? 'bg-ember' : 'bg-ink-line'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default StepProgress
