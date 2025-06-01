import formatDate from '@/lib/utils/formatDate'
import Link from '@/components/Link'
import Image from '@/components/Image'

export default function SbcListRecord({ frontMatter }) {
  const {
    slug,
    title,
    summary,
    imageUrl,
    specs, // New field: Array of strings or key-value spec
    affiliateLinks = [], // New field: Array of { label, url }
  } = frontMatter

  return (
    <article className="mb-8 border-b pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Device Image */}
        <div className="md:col-span-1">
          <Link href={`/${slug}`}>
            <Image
              alt={title}
              src={imageUrl}
              className="rounded-xl object-cover"
              width={300}
              height={200}
            />
          </Link>
        </div>

        {/* Device Info */}
        <div className="md:col-span-3 space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            <Link href={`/${slug}`}>{title}</Link>
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400">{summary}</p>

          {/* Specifications */}
          {/* {specs && (
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              {Object.entries(specs).map(([key, value]) => (
                <li key={key}>
                  <span className="font-semibold">{key}:</span> {value}
                </li>
              ))}
            </ul>
          )} */}
          {/* {specs && (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-4 py-2 font-semibold bg-gray-50 dark:bg-gray-800 w-1/3">
                        {key}
                      </th>
                      <td className="px-4 py-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} */}

          {specs && (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
    {Object.entries(specs).map(([key, value]) => (
      <div key={key} className="flex">
        <span className="font-semibold w-32">{key}:</span>
        <span className="flex-1">{value}</span>
      </div>
    ))}
  </div>
)}
          {/* Affiliate Links */}
          {affiliateLinks.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
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

          <div className="mt-4">
            <Link
              href={`/${slug}`}
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
