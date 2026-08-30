import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MARKERS = [
  { label: 'PRODUCT', href: '#products' },
  { label: 'SYSTEM', href: '#how-it-works' },
  { label: 'STORY', href: '#for-business' },
  { label: 'CONTACT', href: '#contact' },
]

/**
 * No navbar. No pill. No background container.
 * Just a wordmark floating in the corner and a thin column of
 * editorial text markers along the edge — the way a caption sits
 * next to a photograph, not the way a menu sits inside a bar.
 */
export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sections = MARKERS.map((m) => document.querySelector(m.href)).filter(Boolean) as Element[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <a
          href="#top"
          data-cursor
          className="pointer-events-auto font-display text-sm tracking-[0.2em] text-[#f2edf7]"
        >
          TAPOR<span className="text-[var(--color-violet-electric)]">A</span>A
        </a>

        <nav
          aria-label="Section navigation"
          className="pointer-events-auto hidden flex-col items-end gap-3 md:flex"
        >
          {MARKERS.map((m) => (
            <a
              key={m.href}
              href={m.href}
              data-cursor
              className="font-mono text-[10px] tracking-[0.28em] transition-colors duration-300"
              style={{ color: active === m.href ? 'var(--color-violet-electric)' : '#635a70' }}
            >
              {m.label}
            </a>
          ))}
        </nav>

        <button
          data-cursor
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto font-mono text-[10px] tracking-[0.28em] text-[#a89bb8] md:hidden"
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-8 bg-[#050505]/97 px-8 md:hidden"
          >
            {MARKERS.map((m, i) => (
              <motion.a
                key={m.href}
                href={m.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="font-display text-4xl text-[#f2edf7]"
              >
                {m.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
