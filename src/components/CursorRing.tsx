import { useEffect, useRef, useState } from 'react'

/**
 * The cursor itself becomes the product gesture: a small ring that
 * contracts into a "tap" the instant it crosses an interactive element,
 * echoing the NFC tap motif used throughout the site.
 */
export default function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%)`
      }
      const target = e.target as HTMLElement
      setActive(!!target.closest('[data-cursor]'))
    }

    let raf: number
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%,-50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-[var(--color-violet-electric)]"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border transition-[width,height,opacity,border-color] duration-300 ease-out"
        style={{
          width: active ? 14 : 32,
          height: active ? 14 : 32,
          borderColor: active ? 'var(--color-violet-electric)' : 'rgba(183,107,255,0.55)',
          boxShadow: active ? '0 0 18px rgba(183,107,255,0.65)' : '0 0 10px rgba(183,107,255,0.25)',
        }}
      />
    </>
  )
}
