import { useEffect, useRef, useState } from 'react'

/**
 * Tracks how far the viewport has scrolled through a tall container
 * (used for "sticky inner scene, scroll drives progress" sections).
 * Progress is 0 when the container's top reaches the viewport top,
 * 1 when its bottom reaches the viewport bottom.
 */
export function useScrollProgress<T extends HTMLElement>(step = 0.01) {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)
  const lastRef = useRef(0)

  useEffect(() => {
    let raf = 0

    const measure = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const raw = total > 0 ? (-rect.top) / total : 0
      const clamped = Math.min(1, Math.max(0, raw))
      if (Math.abs(clamped - lastRef.current) >= step || clamped === 0 || clamped === 1) {
        lastRef.current = clamped
        setProgress(clamped)
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [step])

  return { ref, progress }
}
