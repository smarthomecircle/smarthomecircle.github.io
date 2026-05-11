import AffiliateLinkButtons from "./AffiliateLinkButtons"

export default function AffiliateLinksFromMetadata({ affiliateLinks }) {
  // Handle both old format (array) and new format (object with title and links)
  let title = null
  let links = []
  let image = null

  if (Array.isArray(affiliateLinks)) {
    // Old format: array of links
    links = affiliateLinks
  } else if (affiliateLinks && typeof affiliateLinks === 'object') {
    // New format: object with title and links
    title = affiliateLinks.title
    links = affiliateLinks.links || []
    image = affiliateLinks.image
  }

  if (!links || links.length === 0) {
    return null
  }

  const imageSrc = typeof image === 'string' ? image : image?.src
  const imageAlt =
    typeof image === 'object' && image?.alt ? image.alt : title || 'Affiliate product image'

  return (
    <div className="border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900/20 pl-4 pr-3 py-1 sm:py-3 my-3 rounded-r-lg prose-links">
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
        .prose-links :global(.affiliate-image) {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
      {imageSrc ? (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 sm:items-start">
          <div className="w-full sm:w-48 sm:flex-shrink-0">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="affiliate-image w-full aspect-[16/9] object-cover rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            {title && (
              <p className="m-0 text-sm font-bold text-gray-900 dark:text-gray-100">{title}:</p>
            )}
            <AffiliateLinkButtons links={links} />
          </div>
        </div>
      ) : title ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="m-0 text-sm font-bold text-gray-900 dark:text-gray-100">{title}:</p>
          <AffiliateLinkButtons links={links} />
        </div>
      ) : (
        <AffiliateLinkButtons links={links} className="py-1.5" />
      )}
    </div>
  )
}
