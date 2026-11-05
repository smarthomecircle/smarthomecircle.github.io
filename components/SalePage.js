import { PageSEO } from '@/components/SEO'
import SaleCouponTable from '@/components/SaleCouponTable'
import SaleProductTable from '@/components/SaleProductTable'

const chipClassName =
  'rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'

/**
 * Shared layout for the /sale/* pages: hero, optional sale banner, category
 * links, optional discount codes, and one product table per category.
 * @param {object} sale - data from data/sales/*.js, see data/sales/README.md
 */
export default function SalePage({ seoTitle, seoDescription, title, intro, sale, emptyMessage }) {
  const { imageUrl, event, codes = [], codesNote, categories = [] } = sale
  const sections = categories.filter((category) => category.products?.length > 0)

  return (
    <>
      <PageSEO title={seoTitle} description={seoDescription} imageUrl={imageUrl} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">{intro}</p>

          {event && (
            <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 p-5 text-white shadow-md sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  Sale event
                </p>
                <p className="text-xl font-bold">{event.name}</p>
                {(event.start || event.end) && (
                  <p className="text-sm text-white/90">
                    {event.start} – {event.end}
                  </p>
                )}
              </div>
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Shop the sale
                </a>
              )}
            </div>
          )}

          {sections.length > 1 && (
            <nav aria-label="Deal categories" className="flex flex-wrap gap-2">
              {codes.length > 0 && (
                <a href="#codes" className={chipClassName}>
                  Discount codes
                </a>
              )}
              {sections.map((category) => (
                <a key={category.id} href={`#${category.id}`} className={chipClassName}>
                  {category.title}
                  <span className="ml-1.5 text-xs text-gray-400">{category.products.length}</span>
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="py-10 space-y-12">
          {codes.length > 0 && (
            <section id="codes" className="scroll-mt-24 space-y-3 max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Discount codes
              </h2>
              {codesNote && <p className="text-gray-500 dark:text-gray-400">{codesNote}</p>}
              <SaleCouponTable codes={codes} />
            </section>
          )}

          {sections.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
          ) : (
            sections.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-24 space-y-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {category.title}
                </h2>
                {category.description && (
                  <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
                    {category.description}
                  </p>
                )}
                <SaleProductTable products={category.products} defaultBadge={event?.badge} />
              </section>
            ))
          )}
        </div>
      </div>
    </>
  )
}
