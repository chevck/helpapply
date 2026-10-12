import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

function CountUp({ value, suffix = '', prefix = '', duration = 1.1, delay = 0, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.6 })

  useEffect(() => {
    if (!inView || !ref.current) return

    if (reduce) {
      ref.current.textContent = `${prefix}${value}${suffix}`
      return
    }

    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`
      },
    })

    return () => controls.stop()
  }, [inView, value, suffix, prefix, duration, delay, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

export default CountUp
