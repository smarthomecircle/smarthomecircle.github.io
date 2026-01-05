export default function AffiliateLinksFromMetadata({ affiliateLinks }) {
  // Handle both old format (array) and new format (object with title and links)
  let title = null
  let links = []
  
  if (Array.isArray(affiliateLinks)) {
    // Old format: array of links
    links = affiliateLinks
  } else if (affiliateLinks && typeof affiliateLinks === 'object') {
    // New format: object with title and links
    title = affiliateLinks.title
    links = affiliateLinks.links || []
  }
  
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className="border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 pl-4 pr-3 py-1 my-3 rounded-r-lg prose-links">
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
      {title ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {title}:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {links.map((link, index) => (
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
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 py-1.5">
          {links.map((link, index) => (
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
      )}
    </div>
  )
}

