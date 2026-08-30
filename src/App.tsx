import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import HowItWorks from '@/components/HowItWorks'
import Benefits from '@/components/Benefits'
import HardwareShowcase from '@/components/HardwareShowcase'
import UseCases from '@/components/UseCases'
import NoAppSection from '@/components/NoAppSection'
import Trust from '@/components/Trust'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div className="relative bg-[var(--color-ink)]">
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Products />
        <HowItWorks />
        <HardwareShowcase />
        <Benefits />
        <UseCases />
        <NoAppSection />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
