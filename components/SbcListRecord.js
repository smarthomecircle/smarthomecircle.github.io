import Link from '@/components/Link'
import Image from '@/components/Image'

export default function SbcListRecord({ frontMatter }) {
  const {
    slug,
    title,
    imageUrl,
    specs,
    affiliateLinks = [],
  } = frontMatter

  return (
    <article className="mb-8 border-b pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left column: Image + Affiliate Links (desktop only) */}
        <div className="md:col-span-1 flex flex-col items-center">
          {/* Image */}
          <Link href={`/sbc/${slug}`}>
            <Image
              alt={title}
              src={imageUrl}
              className="rounded-xl object-cover"
              width={300}
              height={200}
              style={{ width: 300, height: 200, maxWidth: '100%', height: 'auto' }}
            />
          </Link>

          {/* Affiliate Links (vertical for desktop) */}
          {affiliateLinks.length > 0 && (
            <div className="hidden md:flex flex-col space-y-2 mt-4 w-full max-w-xs">
              {affiliateLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm w-fit mx-auto"
                >
                  Buy on {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Title, Affiliate Links (mobile), Specs, Review Link */}
        <div className="md:col-span-2 space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            <Link href={`/sbc/${slug}`}>{title}</Link>
          </h2>

          {/* Affiliate links (horizontal on mobile) */}
          {affiliateLinks.length > 0 && (
            <div className="flex md:hidden flex-wrap gap-2 mb-2">
              {affiliateLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Buy on {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Specifications */}
          {specs && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-semibold w-32">{key}:</span>
                  <span className="flex-1">{String(value)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Full review link */}
          <div className="mt-4">
            <Link
              href={`/sbc/${slug}`}
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              Read Full Review →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
