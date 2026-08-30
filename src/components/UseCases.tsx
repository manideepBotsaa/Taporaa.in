import { useState } from 'react'
import { motion } from 'framer-motion'

const CASES = [
  { label: 'Café', hue: '270, 80%, 60%' },
  { label: 'Restaurant', hue: '280, 70%, 55%' },
  { label: 'Bar', hue: '265, 85%, 58%' },
  { label: 'Hotel', hue: '285, 60%, 62%' },
  { label: 'Food court', hue: '260, 75%, 56%' },
  { label: 'Cloud kitchen', hue: '290, 65%, 58%' },
]

export default function UseCases() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{
          background: `radial-gradient(45% 45% at 70% 40%, hsla(${CASES[active].hue}, 0.2), transparent 65%)`,
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-3">Where it lives</p>
        <h2 className="font-display max-w-xl text-4xl text-[#f7f2ff] sm:text-5xl">Made for hospitality.</h2>

        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4" role="group" aria-label="Business types">
          {CASES.map((c, i) => (
            <span
              key={c.label}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-cursor
              className="font-display cursor-default text-3xl transition-colors duration-300 sm:text-5xl"
              style={{ color: active === i ? `hsl(${c.hue})` : '#5c5268' }}
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
