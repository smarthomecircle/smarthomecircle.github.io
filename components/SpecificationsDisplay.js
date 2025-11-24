import Link from './Link'

// Helper function to render value (handles URLs)
const renderValue = (value, label = null) => {
  // Empty / null: show dash
  if (value == null || (typeof value === 'string' && value.trim() === '')) {
    return <span className="text-gray-400 dark:text-gray-500">-</span>
  }
  // Check if value is an object with a url property
  if (typeof value === 'object' && value !== null && value.url) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{label || 'Link'}</span>
        <a 
          href={value.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          title={value.url}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </span>
    )
  }
  
  const stringValue = String(value).trim()
  // Check if value is a direct URL
  const urlPattern = /^https?:\/\/.+/i
  if (urlPattern.test(stringValue)) {
    return (
      <a 
        href={stringValue} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline inline-flex items-center gap-1"
      >
        link
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )
  }
  return <span className="whitespace-pre-line">{stringValue}</span>
}

export default function SpecificationsDisplay({ specifications, slug, price, affiliateLinks = [], title, url }) {
  if (!specifications) {
    return null
  }

  return (
    <div className="not-prose my-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <style jsx>{`
        .prose-links :global(a) {
          text-decoration: underline;
          text-decoration-color: rgb(94 234 212);
          text-underline-offset: 3px;
          transition: all 0.2s ease;
        }
        .prose-links :global(a:hover) {
          text-decoration-color: rgb(20 184 166);
        }
        :global(.dark) .prose-links :global(a) {
          text-decoration-color: rgb(20 184 166);
        }
        :global(.dark) .prose-links :global(a:hover) {
          text-decoration-color: rgb(45 212 191);
        }
      `}</style>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {(title || price || affiliateLinks.length > 0) && (
          <div className="border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 pl-4 pr-3 py-1 rounded-r-lg prose-links">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                {title && (
                  url ? (
                    <a 
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {title}:
                    </a>
                  ) : (
                    <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                      {title}:
                    </p>
                  )
                )}
                {price && (
                  <div className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {price}
                  </div>
                )}
              </div>
              {affiliateLinks.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {affiliateLinks.map((link, idx) => (
                    <a
                      key={idx}
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
              )}
            </div>
          </div>
        )}
        {slug && (
          <Link
            href={`/sbc-compare?sbc1=${slug}`}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-sm"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Compare
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(specifications).map(([key, value]) => {
          // Check if value is an object (nested spec)
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return (
              <div key={key} className="py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                <span className="font-bold text-gray-900 dark:text-gray-100">{key}:</span>
                <div className="ml-4 mt-1 space-y-1">
                  {Object.entries(value).map(([subKey, subValue]) => {
                    // Check if subValue has a url property (nested link)
                    const hasUrl = typeof subValue === 'object' && subValue !== null && subValue.url
                    return (
                      <div key={subKey} className="flex items-start text-sm">
                        {hasUrl ? (
                          <span className="text-gray-700 dark:text-gray-300">{renderValue(subValue, subKey)}</span>
                        ) : (
                          <>
                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">{subKey}:</span>
                            <span className="text-gray-700 dark:text-gray-300">{renderValue(subValue)}</span>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
          return (
            <div key={key} className="flex items-start py-2 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
              <span className="font-bold text-gray-900 dark:text-gray-100 mr-2">{key}:</span>
              <span className="text-gray-700 dark:text-gray-300">{renderValue(value)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
