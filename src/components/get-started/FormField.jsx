import { WarningCircle } from '@phosphor-icons/react'

function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  autoComplete,
  inputMode,
}) {
  const showError = Boolean(touched && error)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-paper">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={showError}
        aria-describedby={showError ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-ink-raised px-4 py-3.5 text-[15px] text-paper placeholder:text-paper-dim/50 outline-none transition-colors duration-200 focus-visible:border-ember focus-visible:ring-2 focus-visible:ring-ember/60 ${
          showError ? 'border-ember-dim' : 'border-ink-line'
        }`}
      />
      {showError && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-sm text-ember-dim">
          <WarningCircle size={15} weight="bold" />
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
