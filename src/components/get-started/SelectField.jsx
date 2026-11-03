import { CaretDown } from '@phosphor-icons/react'
import FieldError from './FieldError'

function SelectField({ id, label, value, onChange, onBlur, error, touched, options, placeholder }) {
  const showError = Boolean(touched && error)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-paper">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`w-full appearance-none rounded-xl border bg-ink-raised px-4 py-3.5 pr-11 text-[15px] outline-none transition-colors duration-200 focus-visible:border-ember focus-visible:ring-2 focus-visible:ring-ember/60 ${
            value ? 'text-paper' : 'text-paper-dim/50'
          } ${showError ? 'border-ember-dim' : 'border-ink-line'}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
        <CaretDown
          size={16}
          weight="bold"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-paper-dim"
        />
      </div>
      {showError && <FieldError id={`${id}-error`} message={error} />}
    </div>
  )
}

export default SelectField
