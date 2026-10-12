import { Link } from 'react-router-dom'
import Logo from '../Logo'

function StepHeader() {
  return (
    <header className="border-b border-ink-line/70 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6 lg:h-18 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo className="h-7 w-7 shrink-0" />
          <span className="font-display text-xl font-semibold tracking-tight text-paper">
            Help Apply
          </span>
        </Link>
      </div>
    </header>
  )
}

export default StepHeader
