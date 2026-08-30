import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import CardMesh from '@/components/three/CardMesh'
import PointerTilt from '@/components/three/PointerTilt'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function HardwareShowcase() {
  const reduced = useReducedMotion()

  return (
    <section className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{ background: 'radial-gradient(60% 50% at 50% 20%, rgba(124,58,237,0.14), transparent 65%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-3">The hardware</p>
          <h2 className="font-display max-w-xl text-4xl text-[#f7f2ff] sm:text-5xl">
            A card, made properly.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#b6acc4]">
            Slim, weighted, and finished like something worth leaving on a
            counter — not a printed slip of paper.
          </p>
        </motion.div>

        <div className="relative mt-16 h-[420px] sm:h-[520px]">
          <Canvas camera={{ position: [0, 0, 7.5], fov: 38 }} dpr={[1, 1.6]}>
            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 5, 6]} intensity={1.2} color="#efe3ff" />
            <pointLight position={[-4, -2, 3]} intensity={1.5} color="#8b3fe0" />
            <Suspense fallback={null}>
              <PointerTilt intensity={reduced ? 0 : 0.2}>
                <CardMesh
                  variant="review"
                  position={[-1.5, 0, 0]}
                  rotation={[0.06, -0.5, -0.03]}
                  scale={1.05}
                  floatSpeed={reduced ? 0 : 0.7}
                  seed={5}
                />
                <CardMesh
                  variant="table"
                  tableNumber="09"
                  position={[1.5, -0.1, -0.3]}
                  rotation={[0.05, 0.45, 0.02]}
                  scale={1.05}
                  floatSpeed={reduced ? 0 : 0.85}
                  seed={19}
                />
              </PointerTilt>
            </Suspense>
          </Canvas>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <span className="font-mono text-[11px] tracking-[0.12em] text-[#8f849f] uppercase">
            Beveled edges
          </span>
          <figure className="group relative col-span-1 overflow-hidden rounded-sm border border-[rgba(183,107,255,0.2)] bg-[var(--color-ink-deep)]">
            <img
              src="/images/semi-matte-finish.png"
              alt="Semi-matte wooden Taporaa table card in a restaurant"
              className="aspect-[16/10] w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent px-3 pb-3 pt-8 font-mono text-[11px] tracking-[0.12em] text-[#f2edf7] uppercase">
              Semi-matte finish
            </figcaption>
          </figure>
          <figure className="group relative col-span-1 overflow-hidden rounded-sm border border-[rgba(183,107,255,0.2)] bg-[var(--color-ink-deep)]">
            <img
              src="/images/nfc-qr-both.png"
              alt="Taporaa table cards showing NFC and QR ordering"
              className="aspect-[16/10] w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent px-3 pb-3 pt-8 font-mono text-[11px] tracking-[0.12em] text-[#f2edf7] uppercase">
              NFC + QR, both
            </figcaption>
          </figure>
          <span className="font-mono text-[11px] tracking-[0.12em] text-[#8f849f] uppercase">
            Table-numbered
          </span>
        </div>
      </div>
    </section>
  )
}
