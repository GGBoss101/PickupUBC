import { useEffect, useRef, useState } from 'react'

// Flips to true the first time the element scrolls into view, so animations
// (count-ups, filling bars) play when the visitor actually sees them.
export default function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView]
}
