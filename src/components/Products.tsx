import ReviewCardShowcase from '@/components/ReviewCardShowcase'
import TableOrderingShowcase from '@/components/TableOrderingShowcase'

/**
 * ReviewCardShowcase owns the "#products" scroll-scene entry point.
 * TableOrderingShowcase follows as a calmer, static continuation —
 * the film settles before the second product is introduced.
 */
export default function Products() {
  return (
    <>
      <ReviewCardShowcase />
      <section id="table-ordering" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <TableOrderingShowcase />
        </div>
      </section>
    </>
  )
}
