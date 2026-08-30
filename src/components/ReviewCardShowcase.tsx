import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CardMesh from '@/components/three/CardMesh'
import PhoneMesh from '@/components/three/PhoneMesh'
import SignalWaves from '@/components/three/SignalWaves'
import PointerTilt from '@/components/three/PointerTilt'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t))
}

function windowOpacity(p: number, start: number, end: number, fade = 0.08) {
  if (p < start - fade || p > end + fade) return 0
  const inFade = Math.min(1, Math.max(0, (p - start) / fade))
  const outFade = Math.min(1, Math.max(0, (end - p) / fade))
  return Math.min(inFade, outFade, 1)
}

/**
 * Product 01, told as a short scroll-controlled scene rather than a
 * panel: the card rotates in isolation, a signal appears, a phone
 * arrives, and the review moment resolves into the resting copy.
 */
export default function ReviewCardShowcase() {
  const reduced = useReducedMotion()
  const { ref, progress: p } = useScrollProgress<HTMLDivElement>()

  const phoneX = lerp(3.2, -1.3, Math.min(1, p / 0.55))
  const showWaves = p > 0.3 && p < 0.85
  const restOpacity = Math.min(1, Math.max(0, (p - 0.72) / 0.2))

  return (
    <section id="products" ref={ref} className="relative" style={{ height: '260vh' }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 px-6 md:grid-cols-2">
          <div className="relative order-2 h-[46vh] md:order-1 md:h-[70vh]">
            <p
              className="font-display pointer-events-none absolute inset-x-0 top-6 z-10 text-center text-[11vw] leading-none text-[#f7f2ff] sm:text-6xl md:text-left md:text-7xl"
              style={{ opacity: windowOpacity(p, 0, 0.22) }}
            >
              ONE TAP.
            </p>
            <p
              className="font-display pointer-events-none absolute inset-x-0 top-6 z-10 text-center text-[11vw] leading-none text-[var(--color-violet-electric)] text-glow sm:text-6xl md:text-left md:text-7xl"
              style={{ opacity: windowOpacity(p, 0.55, 0.75) }}
            >
              REVIEW.
            </p>

            <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.6]}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 4, 5]} intensity={1.1} color="#efe3ff" />
              <pointLight position={[-3, -1, 2]} intensity={1.3} color="#8b3fe0" />
              <Suspense fallback={null}>
                <PointerTilt intensity={reduced ? 0 : 0.22}>
                  <CardMesh
                    variant="review"
                    position={[0.3, 0, 0]}
                    rotation={[0.05, lerp(-0.9, -0.3, Math.min(1, p / 0.4)), -0.04]}
                    scale={1}
                    floatSpeed={reduced ? 0 : 0.9}
                    seed={11}
                  />
                  <group position={[reduced ? -1.3 : phoneX, -0.4, -0.6]} rotation={[0, 0.5, 0]}>
                    <PhoneMesh scale={0.5} />
                  </group>
                  {(reduced || showWaves) && <SignalWaves position={[-0.4, -0.15, 0.5]} color="#b76bff" />}
                </PointerTilt>
              </Suspense>
            </Canvas>
          </div>

          <div
            className="order-1 md:order-2"
            style={{ opacity: reduced ? 1 : restOpacity, transform: `translateY(${lerp(16, 0, reduced ? 1 : restOpacity)}px)` }}
          >
            <p className="eyebrow mb-4">Product 01</p>
            <h3 className="font-display text-4xl text-[#f7f2ff] sm:text-5xl">Google Review Card</h3>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#b6acc4]">
              One card at the counter or on the table. A tap — or a scan —
              and the customer lands straight on your Google review page.
              Turning a happy customer into a five-star review stops
              depending on how much they feel like typing your name into
              search.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
