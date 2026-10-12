function Logo({ className = 'h-7 w-7' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Help Apply"
    >
      <rect x="4" y="2" width="20" height="26" rx="3" fill="#f6f3ec" />
      <path d="M24 2h2a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2h-2z" fill="#c9c3b6" />
      <path
        d="M9.5 15.5 13.5 19.5 21 11"
        stroke="#ff5d2a"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Logo
