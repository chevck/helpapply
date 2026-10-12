import { Link } from 'react-router-dom'
import { CheckCircle } from '@phosphor-icons/react'

function SuccessState({ name }) {
  const firstName = name.trim().split(' ')[0]

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ember/10 text-ember">
        <CheckCircle size={30} weight="bold" />
      </div>
      <h2 className="font-display text-3xl font-semibold uppercase leading-[0.95] text-paper lg:text-4xl">
        Got it{firstName ? `, ${firstName}` : ''}.
      </h2>
      <p className="max-w-[42ch] text-[15px] text-paper-dim">
        We will review your CV next and reach out by phone if we need
        anything else.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-full border border-ink-line px-6 py-3.5 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-paper-dim active:translate-y-0 active:scale-[0.98]"
      >
        Back to homepage
      </Link>
    </div>
  )
}

export default SuccessState
