import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'business', label: 'Business name', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'businessType', label: 'Business type', type: 'text' },
]

/**
 * The closing statement doubles as the interaction: no boxed "Contact
 * Us" panel, no submit button — WhatsApp / Email / Call are plain
 * text links, and the form (needed for the written brief) sits directly
 * on the page as underlined fields rather than inside a card.
 */
export default function Contact() {
  const [sent, setSent] = useState(false)

  // NOTE: wire this handler to your real backend / form endpoint before launch.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(55% 45% at 50% 0%, rgba(139,63,224,0.2), transparent 65%)' }}
      />
      <div className="relative mx-auto max-w-4xl px-6">
        <p className="eyebrow mb-6 text-center">04 · The invitation</p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-display text-center text-[13vw] leading-[0.98] text-[#f7f2ff] sm:text-6xl"
        >
          Let's put
          <br />
          your tables
          <br />
          <span className="text-glow text-[var(--color-violet-electric)]">to work.</span>
        </motion.h2>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          <a href="https://wa.me/917207702095" data-cursor className="link-glow font-mono text-sm tracking-wide text-[#f2edf7]">
            WhatsApp →
          </a>
          <a href="mailto:hello@taporaa.com" data-cursor className="link-glow font-mono text-sm tracking-wide text-[#f2edf7]">
            Email →
          </a>
          <a href="tel:+910000000000" data-cursor className="link-glow font-mono text-sm tracking-wide text-[#f2edf7]">
            Call →
          </a>
        </div>

        <div className="mx-auto mt-24 max-w-2xl">
          {sent ? (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <span className="font-display block text-2xl text-[#f7f2ff]">Message ready.</span>
              <span className="mt-3 block text-sm text-[#b6acc4]">
                Connect this form to your backend to send it — for now it's held locally.
              </span>
            </motion.p>
          ) : (
            <>
              <p className="font-mono mb-10 text-center text-[11px] tracking-[0.2em] text-[#635a70]">
                OR LEAVE US A FEW LINES
              </p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.name} className="relative">
                    <label htmlFor={f.name} className="font-mono mb-2 block text-[11px] tracking-[0.14em] text-[#a89bb8] uppercase">
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      required
                      className="w-full border-b border-[var(--color-line)] bg-transparent pb-2 text-[#f2edf7] outline-none transition-colors focus:border-[var(--color-violet-electric)]"
                    />
                  </div>
                ))}
                <div className="relative sm:col-span-2">
                  <label htmlFor="message" className="font-mono mb-2 block text-[11px] tracking-[0.14em] text-[#a89bb8] uppercase">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full resize-none border-b border-[var(--color-line)] bg-transparent pb-2 text-[#f2edf7] outline-none transition-colors focus:border-[var(--color-violet-electric)]"
                  />
                </div>
                <div className="sm:col-span-2 sm:text-center">
                  <button
                    type="submit"
                    data-cursor
                    className="link-glow font-mono text-sm text-[var(--color-violet-electric)]"
                  >
                    Send →
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
