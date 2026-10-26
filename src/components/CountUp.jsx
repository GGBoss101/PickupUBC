import { useEffect, useState } from 'react'
import useInView from '../hooks/useInView.js'

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Counts from 0 up to `value` like a score tally once it scrolls into view.
export default function CountUp({ value, duration = 1400 }) {
  const [ref, inView] = useInView()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion()) {
      setShown(value)
      return
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return <span ref={ref}>{shown.toLocaleString('en-US')}</span>
}
