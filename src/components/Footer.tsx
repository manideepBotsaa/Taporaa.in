export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-line)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
        <span className="font-display text-sm tracking-[0.18em] text-[#c9bfd6]">
          TAPOR<span className="text-[var(--color-violet-electric)]">A</span>A
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="#products" className="link-glow font-mono text-[11px] tracking-wide text-[#8f849f]" data-cursor>
            Products
          </a>
          <a href="#how-it-works" className="link-glow font-mono text-[11px] tracking-wide text-[#8f849f]" data-cursor>
            How it works
          </a>
          <a href="#contact" className="link-glow font-mono text-[11px] tracking-wide text-[#8f849f]" data-cursor>
            Contact
          </a>
          <a href="https://wa.me/917207702095" className="link-glow font-mono text-[11px] tracking-wide text-[#8f849f]" data-cursor>
            WhatsApp
          </a>
          <a href="https://www.instagram.com/taporaaa.in/" className="link-glow font-mono text-[11px] tracking-wide text-[#8f849f]" data-cursor>
            Instagram
          </a>
          <a href="mailto:hello@taporaa.com" className="link-glow font-mono text-[11px] tracking-wide text-[#8f849f]" data-cursor>
            Email
          </a>
        </nav>

        <span className="font-mono text-[11px] text-[#524a5f]">© {new Date().getFullYear()} TAPORAA</span>
      </div>
    </footer>
  )
}
