import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const REVIEW_FLOW = [
  { n: '01', label: 'TAP', detail: 'Customer taps their phone on the card at the counter.' },
  { n: '02', label: 'OPEN', detail: 'Their browser opens straight to your Google review page.' },
  { n: '03', label: 'REVIEW', detail: 'They leave a review in seconds — no app, no searching.' },
]

const ORDER_FLOW = [
  { n: '01', label: 'TAP', detail: 'Customer at Table 07 taps or scans their card.' },
  { n: '02', label: 'ORDER', detail: 'The digital menu opens for that exact table.' },
  { n: '03', label: 'RECEIVE', detail: 'Your counter gets the order, already tagged Table 07.' },
]

function Journey({ title, steps }: { title: string; steps: typeof REVIEW_FLOW }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.3'] })
  const height = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <div ref={ref} className="relative">
      <h3 className="font-mono mb-8 text-xs tracking-[0.25em] text-[#a89bb8] uppercase">{title}</h3>
      <div className="relative pl-8">
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-[var(--color-line)]" />
        <motion.div
          className="absolute left-[3px] top-2 w-px origin-top bg-[var(--color-violet-electric)] shadow-[0_0_10px_var(--color-violet-electric)]"
          style={{ scaleY: height, height: 'calc(100% - 1rem)' }}
        />
        <div className="flex flex-col gap-14">
          {steps.map((step) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span className="absolute -left-8 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--color-violet-electric)] shadow-[0_0_12px_var(--color-violet-electric)]" />
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[var(--color-violet-electric)]">{step.n}</span>
                <span className="font-display text-2xl text-[#f7f2ff] sm:text-3xl">{step.label}</span>
              </div>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#b6acc4]">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-3">02 · The system</p>
        <h2 className="font-display max-w-xl text-4xl text-[#f7f2ff] sm:text-5xl">
          Nothing to learn. Only to notice.
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          <Journey title="Google Review Card" steps={REVIEW_FLOW} />
          <Journey title="Table Ordering Card" steps={ORDER_FLOW} />
        </div>
      </div>
    </section>
  )
}
