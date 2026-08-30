import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import PhoneMesh from '@/components/three/PhoneMesh'
import CardMesh from '@/components/three/CardMesh'
import SignalWaves from '@/components/three/SignalWaves'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STAGES = ['Tap card', 'Browser opens', 'Menu appears']

export default function NoAppSection() {
  const [stage, setStage] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2200)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-4">The whole point</p>
          <h2 className="font-display text-4xl leading-[1.05] text-[#f7f2ff] sm:text-5xl">
            No app.
            <br />
            No waiting.
            <br />
            <span className="text-[var(--color-violet-electric)] text-glow">Just tap.</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#b6acc4]">
            Everything runs in the browser already open on your customer's
            phone. No download, no account, no update to wait for — the tap
            is the entire onboarding.
          </p>

          <div className="mt-8 flex gap-6" aria-hidden>
            {STAGES.map((s, i) => (
              <span
                key={s}
                className={`font-mono text-xs tracking-widest transition-colors duration-500 ${
                  stage === i ? 'text-[var(--color-violet-electric)]' : 'text-[#524a5f]'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative h-[380px] sm:h-[460px]">
          <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.6]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 4, 5]} intensity={1.1} color="#efe3ff" />
            <pointLight position={[-3, -1, 2]} intensity={1.3} color="#8b3fe0" />
            <Suspense fallback={null}>
              <group position={[1.1, -0.3, -0.6]} rotation={[0.05, -0.4, -0.03]} scale={0.75}>
                <CardMesh variant="table" tableNumber="12" floatSpeed={reduced ? 0 : 0.8} seed={41} />
              </group>
              <group position={[-0.9, 0.1, 0.6]} rotation={[0, 0.35, 0]}>
                <PhoneMesh scale={0.62} />
              </group>
              <SignalWaves position={[0.1, -0.1, 0.9]} />
            </Suspense>
          </Canvas>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={stage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-violet-electric)]"
              >
                {STAGES[stage].toUpperCase()}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
