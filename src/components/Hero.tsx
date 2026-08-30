import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import CardMesh from '@/components/three/CardMesh'
import ParticleField from '@/components/three/ParticleField'
import PointerTilt from '@/components/three/PointerTilt'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const STAGE_COPY = ['TAP.', 'CONNECT.', 'EXPERIENCE.']

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t))
}

function stageOpacity(progress: number, index: number, total: number) {
  const span = 1 / total
  const start = index * span
  const fadeIn = Math.min(1, Math.max(0, (progress - start) / (span * 0.28)))
  const fadeOut = Math.min(1, Math.max(0, (start + span - progress) / (span * 0.28)))
  if (progress < start - span * 0.1 || progress > start + span * 1.1) return 0
  return Math.min(fadeIn, fadeOut, 1)
}

/**
 * The hero is a single tall (300vh) scroll region with a sticky inner
 * viewport. Scrolling through it plays a short "product film": the
 * card drifts in, staged words announce the concept, then the camera
 * settles and the full headline + copy resolve around the object.
 */
export default function Hero() {
  const reduced = useReducedMotion()
  const { ref, progress } = useScrollProgress<HTMLDivElement>()
  const [experienceHoldComplete, setExperienceHoldComplete] = useState(false)
  const experienceHoldStarted = useRef(false)
  const experienceHoldTimeout = useRef<number | undefined>(undefined)

  const experienceStart = (STAGE_COPY.length - 1) / STAGE_COPY.length
  const finalStart = 0.84
  const finalProgress = experienceHoldComplete
    ? Math.min(1, Math.max(0, (progress - finalStart) / (1 - finalStart)))
    : 0

  useEffect(() => {
    if (reduced || progress < experienceStart || experienceHoldStarted.current) return

    experienceHoldStarted.current = true
    experienceHoldTimeout.current = window.setTimeout(() => setExperienceHoldComplete(true), 1000)
  }, [experienceStart, progress, reduced])

  useEffect(() => () => window.clearTimeout(experienceHoldTimeout.current), [])

  const cardScale = lerp(0.68, 1.05, Math.min(1, progress / 0.62)) 
  const cardZ = lerp(-1.4, 0.3, Math.min(1, progress / 0.62))
  const cardRotY = lerp(-0.1, -0.35, Math.min(1, progress / 0.62))

  return (
    <section id="top" ref={ref} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 55% at 78% 30%, rgba(139,63,224,0.24), transparent 60%), radial-gradient(50% 45% at 15% 80%, rgba(124,58,237,0.14), transparent 65%), #050505',
          }}
        />

        {/* staged editorial words */}
        {!reduced &&
          STAGE_COPY.map((word, i) => {
            const isFinalStage = i === STAGE_COPY.length - 1
            const experienceOpacity =
              Math.min(1, Math.max(0, (progress - experienceStart) / 0.08)) *
              (experienceHoldComplete ? 1 - finalProgress : 1)

            return (
              <h2
                key={word}
                aria-hidden
                className="font-display pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center text-[14vw] leading-none text-[#f7f2ff] sm:text-[9vw]"
                style={{ opacity: isFinalStage ? experienceOpacity : stageOpacity(progress, i, STAGE_COPY.length) }}
              >
                {word}
              </h2>
            )
          })}

        {/* resolved headline + copy */}
        <div
          className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-6"
          style={{ opacity: finalProgress, transform: `translateY(${lerp(24, 0, finalProgress)}px)` }}
        >
          <div>
            <p className="eyebrow mb-6">NFC + QR for modern hospitality</p>
            <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight text-[#f7f2ff] sm:text-6xl md:text-6xl lg:text-[4.2rem]">
              Turn every
              <br />
              table into a
              <br />
              <span className="text-glow text-[var(--color-violet-electric)]">touchpoint.</span>
            </h1>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-[#b6acc4]">
              A physical card. A tap. A Google review, or a full table order —
              no app, no queue, no screen full of buttons.
            </p>
          </div>
          <div />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[5]">
          <Canvas camera={{ position: [0, 0, 6.2], fov: 40 }} dpr={[1, 1.6]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 4, 5]} intensity={1.2} color="#efe3ff" />
            <pointLight position={[-3, -2, 2]} intensity={1.4} color="#8b3fe0" />
            <Suspense fallback={null}>
              {!reduced && <ParticleField count={140} />}
              <PointerTilt intensity={reduced ? 0 : 0.28}>
                <group position={[0, 0, cardZ]} rotation={[0.08, cardRotY, -0.05]} scale={cardScale}>
                  <CardMesh variant="review" floatSpeed={reduced ? 0 : 0.8} />
                </group>
              </PointerTilt>
            </Suspense>
          </Canvas>
        </div>

        <div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          style={{ opacity: 1 - Math.min(1, progress / 0.15) }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#6d6180]">SCROLL</span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-[var(--color-violet-electric)] to-transparent" />
        </div>
      </div>
    </section>
  )
}
