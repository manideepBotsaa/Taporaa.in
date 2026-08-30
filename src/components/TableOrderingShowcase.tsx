import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import CardMesh from '@/components/three/CardMesh'
import PointerTilt from '@/components/three/PointerTilt'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const TABLES = ['01', '02', '03', '04']

const MENU: Record<string, { section: string; items: { item: string; price: string }[] }[]> = {
  '01': [{ section: 'MAINS', items: [{ item: 'Truffle Fries', price: '₹220' }, { item: 'Cold Brew', price: '₹180' }] }],
  '02': [{ section: 'MAINS', items: [{ item: 'Margherita Pizza', price: '₹390' }, { item: 'Iced Latte', price: '₹190' }] }],
  '03': [{ section: 'MAINS', items: [{ item: 'Butter Chicken', price: '₹410' }, { item: 'Garlic Naan', price: '₹90' }] }],
  '04': [{ section: 'MAINS', items: [{ item: 'Grilled Paneer Salad', price: '₹260' }, { item: 'Fresh Lime Soda', price: '₹110' }] }],
}

/**
 * Product 02: choosing a table is the one place a discrete choice is
 * unavoidable, so it stays as plain text (hover on desktop, tap on
 * touch) rather than a button — the card and the menu simply follow.
 */
export default function TableOrderingShowcase() {
  const [active, setActive] = useState('01')
  const reduced = useReducedMotion()
  const groups = MENU[active]
  const total = groups
    .flatMap((g) => g.items)
    .reduce((sum, i) => sum + parseInt(i.price.replace('₹', ''), 10), 0)

  return (
    <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-8">
      <div className="relative h-[340px] sm:h-[420px]">
        <p className="font-mono absolute -top-8 left-0 text-[11px] tracking-[0.2em] text-[#635a70]">
          PHYSICAL TABLE → SMART CARD → DIGITAL MENU
        </p>
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.6]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 5]} intensity={1.1} color="#efe3ff" />
          <pointLight position={[-3, -1, 2]} intensity={1.3} color="#8b3fe0" />
          <Suspense fallback={null}>
            <PointerTilt intensity={reduced ? 0 : 0.25}>
              <CardMesh
                key={active}
                variant="table"
                tableNumber={active}
                position={[-0.3, 0, 0]}
                rotation={[0.04, 0.28, 0.03]}
                scale={1}
                floatSpeed={reduced ? 0 : 0.9}
                seed={parseInt(active, 10) + 20}
              />
            </PointerTilt>
          </Suspense>
        </Canvas>
      </div>

      <div>
        <p className="eyebrow mb-4">Product 02</p>
        <h3 className="font-display text-4xl text-[#f7f2ff] sm:text-5xl">Smart Table Ordering</h3>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#b6acc4]">
          Every table carries its own card. Tap or scan, and the menu opens
          already knowing where the order came from.
        </p>

        <div className="mt-9 flex gap-7" role="group" aria-label="Choose a table to preview">
          {TABLES.map((t) => (
            <span
              key={t}
              tabIndex={0}
              role="button"
              aria-pressed={active === t}
              onMouseEnter={() => setActive(t)}
              onFocus={() => setActive(t)}
              onClick={() => setActive(t)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActive(t)
              }}
              data-cursor
              className="font-mono cursor-pointer text-xs tracking-widest transition-colors"
              style={{ color: active === t ? 'var(--color-violet-electric)' : '#635a70' }}
            >
              TABLE {t}
            </span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-8 max-w-sm"
          >
            <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#a89bb8]">TABLE {active}</span>
              <span className="font-mono text-[11px] text-[var(--color-violet-electric)]">MENU · LIVE</span>
            </div>
            {groups.map((g) => (
              <div key={g.section} className="mt-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#635a70]">{g.section}</span>
                <ul className="mt-2 flex flex-col gap-2.5">
                  {g.items.map((i) => (
                    <li key={i.item} className="flex items-center justify-between text-sm text-[#e9e3f2]">
                      <span>{i.item}</span>
                      <span className="font-mono text-[#b6acc4]">{i.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between border-t border-[var(--color-line)] pt-3">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[#a89bb8]">ORDER TOTAL</span>
              <span className="font-mono text-sm text-[#f2edf7]">₹{total}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
