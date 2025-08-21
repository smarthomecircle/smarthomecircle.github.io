import formatDate from '@/lib/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'

export default function ListRecord({ frontMatter, authorDetails }) {
  const { slug, date, title, summary, tags, imageUrl, readingTime } = frontMatter
  
  return (
    <article className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer">
      {/* Clickable overlay for entire card */}
      <Link href={`/${slug}`} className="absolute inset-0 z-30" aria-label={`Read article: ${title}`}>
        <span className="sr-only">Read more about {title}</span>
      </Link>
      
      {/* Image Container with Hover Effects */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="block relative h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <Image
            alt={title}
            src={imageUrl}
            className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
            width={400}
            height={192}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2 relative z-10">
            {title}
          </h2>
        </div>

        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 relative z-10">
          {summary}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 relative z-10">
            {tags.slice(0, 4).map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 relative z-10">
          {/* Author & Date */}
          <div className="flex items-center space-x-3">
            {authorDetails && authorDetails[0]?.avatar && (
              <Image
                src={authorDetails[0].avatar}
                width="32"
                height="32"
                alt="avatar"
                className="w-8 h-8 rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
              />
            )}
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {authorDetails && authorDetails[0]?.name}
              </p>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>
                  {formatDate(date)}
                </time>
                {readingTime?.text && (
                  <>
                    <span>•</span>
                    <span>{readingTime.text}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Visual indicator for clickable card */}
          <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium relative z-10 pointer-events-none">
            <span>Read more</span>
            <svg 
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  )
}
