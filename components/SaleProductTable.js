import Image from '@/components/Image'
import Link from '@/components/Link'

const parsePrice = (value) => {
  if (!value) return NaN
  return parseFloat(String(value).replace(/[^0-9.]/g, ''))
}

const discountLabel = (price, originalPrice) => {
  const now = parsePrice(price)
  const before = parsePrice(originalPrice)
  if (!now || !before || now >= before) return null
  return `-${Math.round((1 - now / before) * 100)}%`
}

const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

function ProductRow({ product, showPrice, defaultBadge }) {
  const { name, description, specs, image, url, links, price, originalPrice, post } = product
  const badge = product.badge || discountLabel(price, originalPrice) || defaultBadge
  const dealLinks = links?.length ? links : [{ label: 'View deal', url }]
  const primaryUrl = dealLinks[0].url

  return (
    <tr className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 p-4 md:table-row md:p-0 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
      <td className={`${showPrice ? 'row-span-2' : ''} md:px-4 md:py-4 md:align-middle`}>
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group relative block w-24 h-24 md:w-28 md:h-28 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <Image
            src={image}
            alt={name}
            width={112}
            height={112}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <span className="absolute top-1.5 left-0 rounded-r-md bg-red-600 px-1.5 py-0.5 text-[11px] font-bold leading-tight text-white shadow-md">
              {badge}
            </span>
          )}
        </a>
      </td>

      <td className="md:px-4 md:py-4 md:align-middle">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {name}
        </a>
        {specs?.length > 0 && (
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {specs.map((spec) => (
              <li
                key={spec}
                className="rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300"
              >
                {spec}
              </li>
            ))}
          </ul>
        )}
        {description && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}
        {post?.href && (
          <Link
            href={post.href}
            className="mt-1.5 inline-block text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            {post.label || 'Read the article'} &rarr;
          </Link>
        )}
      </td>

      {showPrice && (
        <td className="md:px-4 md:py-4 md:align-middle md:whitespace-nowrap">
          {(price || originalPrice) && (
            <div className="flex items-baseline gap-2 md:flex-col md:items-start md:gap-0">
              {price && (
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {price}
                </span>
              )}
              {originalPrice && (
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          )}
        </td>
      )}

      <td className="col-span-2 md:px-4 md:py-4 md:align-middle">
        <div className="flex flex-wrap gap-2 md:flex-col md:items-stretch">
          {dealLinks.map((link, index) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`inline-flex flex-1 md:flex-none items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                index === 0
                  ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                  : 'border border-primary-600 text-primary-700 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-900/30'
              }`}
            >
              {link.label || 'View deal'}
              <ExternalIcon />
            </a>
          ))}
        </div>
      </td>
    </tr>
  )
}

/**
 * Table of sale products: thumbnail with deal tag, details, price and deal links.
 * Collapses into stacked rows on small screens. The price column is only shown
 * when at least one product has a price.
 * @param {Array} products - see data/sales/README.md for the product shape
 * @param {string} [defaultBadge] - image tag for products without a badge or discount
 */
export default function SaleProductTable({ products, defaultBadge }) {
  const showPrice = products.some((product) => product.price || product.originalPrice)

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <table className="w-full text-left text-sm">
        <thead className="hidden md:table-header-group bg-gray-50 dark:bg-gray-800/60 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3 w-36">
              Product
            </th>
            <th scope="col" className="px-4 py-3">
              Details
            </th>
            {showPrice && (
              <th scope="col" className="px-4 py-3 w-28">
                Price
              </th>
            )}
            <th scope="col" className="px-4 py-3 w-44">
              <span className="sr-only">Deal links</span>
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              showPrice={showPrice}
              defaultBadge={defaultBadge}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
