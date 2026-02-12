import AffiliateLinkButtons from './AffiliateLinkButtons'

export default function AffiliateLinksFromMetadata({ affiliateLinks }) {
  // affiliateLinks format: { title?: string, links: [{ label, url }] }
  const title = affiliateLinks?.title ?? null
  const links = affiliateLinks?.links || []

  if (links.length === 0) {
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
          <AffiliateLinkButtons links={links} />
        </div>
      ) : (
        <div className="py-1.5">
          <AffiliateLinkButtons links={links} />
        </div>
      )}
    </div>
  )
}

