/**
 * Reusable affiliate link buttons. Renders a row of styled buttons for links [{ label, url }].
 * Returns null when links is empty or not provided.
 */
export default function AffiliateLinkButtons({ links = [] }) {
  const list = Array.isArray(links) ? links : []

  if (list.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {list.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {link.label}
        </a>
      ))}
    </div>
  )
}
