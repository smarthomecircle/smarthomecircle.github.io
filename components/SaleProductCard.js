import Image from '@/components/Image'

/**
 * Single product card for sale/deals pages.
 * @param {string} name - Product title
 * @param {string} description - Short description
 * @param {string} image - Image path or URL
 * @param {string} url - Affiliate / deal link
 * @param {string} [price] - e.g. '$19.99'
 * @param {string} [originalPrice] - shown struck through
 * @param {string} [badge] - e.g. '50% off'
 */
export default function SaleProductCard({
  name,
  description,
  image,
  url,
  price,
  originalPrice,
  badge,
}) {
  return (
    <article className="group relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300">
      {/* Image container */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block relative aspect-[4/3] bg-gray-100 dark:bg-gray-700/50 overflow-hidden"
      >
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-lg bg-primary-500 text-white shadow-md">
            {badge}
          </span>
        )}
      </a>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {name}
        </a>
        <p className="flex-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
          {description}
        </p>

        {/* Price row */}
        {(price || originalPrice) && (
          <div className="flex items-center gap-2 mb-4">
            {originalPrice && (
              <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                {originalPrice}
              </span>
            )}
            {price && (
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {price}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-xl transition-colors"
        >
          View deal
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  )
}
