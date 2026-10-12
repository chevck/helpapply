import { useRef, useState, useEffect } from 'react'
import { validateName, validatePhone } from '../../lib/validation'
import FormField from './FormField'

function ContactStep({ name, phone, onNameChange, onPhoneChange, onContinue }) {
  const [touched, setTouched] = useState({ name: false, phone: false })
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const nameError = validateName(name)
  const phoneError = validatePhone(phone)

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, phone: true })
    if (nameError === '' && phoneError === '') {
      onContinue()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-3xl font-semibold uppercase leading-[0.95] text-paper outline-none lg:text-4xl"
      >
        Let&rsquo;s get your details
      </h2>

      <FormField
        id="full-name"
        label="Full name"
        value={name}
        onChange={onNameChange}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        error={nameError}
        touched={touched.name}
        placeholder="Jordan Alvarez"
        autoComplete="name"
      />

      <FormField
        id="phone-number"
        label="Phone number"
        type="tel"
        inputMode="tel"
        value={phone}
        onChange={onPhoneChange}
        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
        error={phoneError}
        touched={touched.phone}
        placeholder="+1 (555) 123-4567"
        autoComplete="tel"
      />

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-ember px-6 py-3.5 text-center text-[15px] font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f41] active:translate-y-0 active:scale-[0.98]"
      >
        Continue
      </button>
    </form>
  )
}

export default ContactStep
