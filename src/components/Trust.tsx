import { motion } from 'framer-motion'

export default function Trust() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-6 justify-center"
        >
          Built for modern hospitality
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-display text-3xl leading-snug text-[#f7f2ff] sm:text-5xl"
        >
          Simple for customers.
          <br />
          Powerful for businesses.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#b6acc4]"
        >
          TAPORAA is designed with restaurant owners, not around them —
          hardware that survives a busy counter, and an experience customers
          understand without being told how it works.
        </motion.p>
      </div>
    </section>
  )
}
