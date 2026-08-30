import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BENEFITS = [
  { label: 'More Google reviews', detail: 'Every table and counter becomes a review opportunity, not an afterthought.' },
  { label: 'Effortless ordering', detail: 'Customers order from where they sit — no waiting to flag someone down.' },
  { label: 'Less friction, faster tables', detail: 'Fewer trips to the counter means faster turnover during a rush.' },
  { label: 'Orders tagged by table', detail: 'Every order knows exactly which table it came from — no confusion in the kitchen.' },
  { label: 'A modern first impression', detail: 'A tap feels current. It tells customers this place is run well.' },
  { label: 'No app to download', detail: 'Everything runs in the browser your customers already have open.' },
]

export default function Benefits() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="for-business" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-3">03 · The story</p>
        <h2 className="font-display max-w-xl text-4xl text-[#f7f2ff] sm:text-5xl">
          Built for the people running the floor.
        </h2>

        <ul className="mt-16 border-t border-[var(--color-line)]">
          {BENEFITS.map((b, i) => (
            <li
              key={b.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-cursor
              className="group border-b border-[var(--color-line)] py-6 transition-colors sm:py-8"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <span className="font-display text-2xl text-[#8f849f] transition-colors duration-300 group-hover:text-[#f7f2ff] sm:text-4xl">
                  {b.label}
                </span>
                <span className="font-mono text-xs text-[#6d6180] transition-colors duration-300 group-hover:text-[var(--color-violet-electric)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <AnimatePresence>
                {hovered === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="mt-3 max-w-md overflow-hidden text-sm leading-relaxed text-[#b6acc4]"
                  >
                    {b.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
