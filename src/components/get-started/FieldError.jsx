import { WarningCircle } from '@phosphor-icons/react'

function FieldError({ id, message }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-sm text-ember-dim">
      <WarningCircle size={15} weight="bold" />
      {message}
    </p>
  )
}

export default FieldError
