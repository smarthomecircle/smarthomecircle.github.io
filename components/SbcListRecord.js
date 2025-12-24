import { useState } from 'react'
import Link from '@/components/Link'
import Image from '@/components/Image'

// Helper function to parse markdown links and convert to React elements
const parseMarkdownLinks = (text) => {
  if (typeof text !== 'string') return text
  
  // Pattern to match markdown links: [text](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match
  
  while ((match = linkPattern.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    
    // Add the link
    const linkText = match[1]
    const linkUrl = match[2]
    parts.push(
      <a
        key={match.index}
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline inline-flex items-center gap-1"
      >
        {linkText}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )
    
    lastIndex = linkPattern.lastIndex
  }
  
  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }
  
  return parts.length > 0 ? parts : text
}

// Helper function to render value (handles URLs)
const renderValue = (value, label = null) => {
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
  
  // Parse markdown links in the text
  return <span className="whitespace-pre-line">{parseMarkdownLinks(stringValue)}</span>
}

export default function SbcListRecord({ frontMatter, layout = 'card' }) {
  const {
    slug,
    title: originalTitle,
    imageUrl,
    summary,
    includeAsSBC,
  } = frontMatter

  // Extract SBC-specific data from includeAsSBC and frontMatter
  const title = includeAsSBC?.title || originalTitle
  const specifications = includeAsSBC?.specifications
  const affiliateLinks = frontMatter.affiliateLinks || []

  const [isExpanded, setIsExpanded] = useState(false)
  const maxSpecsToShow = 4

  // Mobile Card Layout
  if (layout === 'card') {
    return (
      <article className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
        {/* Image Container with Hover Effects - Clickable */}
        <Link href={`/${slug}`} className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800 block">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <Image
            alt={title}
            src={imageUrl}
            className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
            width={400}
            height={225}
          />
        </Link>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title - Clickable */}
          <div>
            <Link href={`/${slug}`}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2 cursor-pointer">
                {title}
              </h2>
            </Link>
          </div>

          {/* Summary if available */}
          {summary && (
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
              {summary}
            </p>
          )}

          {/* Key Specifications */}
          {specifications && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Specs:</h3>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                {Object.entries(specifications)
                  .slice(0, isExpanded ? Object.entries(specifications).length : maxSpecsToShow)
                  .map(([key, value]) => {
                    // Check if value is an object (nested spec)
                    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                      return (
                        <div key={key} className="py-1 px-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                          <span className="font-bold text-gray-700 dark:text-gray-300">{key}:</span>
                          <div className="ml-3 mt-1 space-y-1">
                            {Object.entries(value).map(([subKey, subValue]) => {
                              // Check if subValue has a url property (nested link)
                              const hasUrl = typeof subValue === 'object' && subValue !== null && subValue.url
                              return (
                                <div key={subKey} className="flex items-start">
                                  {hasUrl ? (
                                    <span className="text-gray-600 dark:text-gray-400">{renderValue(subValue, subKey)}</span>
                                  ) : (
                                    <>
                                      <span className="font-bold text-gray-600 dark:text-gray-400 mr-2">{subKey}:</span>
                                      <span className="text-gray-600 dark:text-gray-400">{renderValue(subValue)}</span>
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
                      <div key={key} className="flex items-start py-1 px-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{renderValue(value)}</span>
                      </div>
                    )
                  })}
              </div>
              
              {/* Expand/Collapse Button */}
              {Object.entries(specifications).length > maxSpecsToShow && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setIsExpanded(!isExpanded)
                  }}
                  className="w-full mt-3 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center justify-center gap-1"
                >
                  {isExpanded ? (
                    <>
                      Show Less
                      <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Show More ({Object.entries(specifications).length - maxSpecsToShow} more)
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Affiliate Links */}
          {affiliateLinks.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Buy Now:</h3>
              <div className="flex flex-wrap gap-2">
                {affiliateLinks.slice(0, 2).map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            {/* SBC Badge */}
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                SBC
              </span>
            </div>

            {/* Read Review Button - Clickable */}
            <Link href={`/${slug}`} className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200">
              <span>Full Review</span>
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // Desktop Horizontal Layout
  return (
    <article className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
      <div className="grid grid-cols-12 gap-6 items-start p-6">
        {/* Left column: Image + Affiliate Links */}
        <div className="col-span-4 flex flex-col items-center space-y-4">
          {/* Image - Clickable */}
          <Link href={`/${slug}`} className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 w-full aspect-[16/9] block">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <Image
              alt={title}
              src={imageUrl}
              className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
              width={300}
              height={169}
            />
          </Link>

          {/* Affiliate Links */}
          {affiliateLinks.length > 0 && (
            <div className="flex flex-col space-y-2 w-full">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">Buy Now:</h3>
              {affiliateLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Buy on {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Title, Summary, Specs, Review Link */}
        <div className="col-span-8 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link href={`/${slug}`}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 cursor-pointer">
                  {title}
                </h2>
              </Link>
              {/* SBC Badge */}
              <div className="flex items-center mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Single Board Computer
                </span>
              </div>
            </div>

            {/* Read Review Arrow - Clickable */}
            <Link href={`/${slug}`} className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200">
              <span>Full Review</span>
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Summary */}
          {summary && (
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
              {summary}
            </p>
          )}

          {/* Comprehensive Specifications */}
          {specifications && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Specifications:</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {Object.entries(specifications)
                  .slice(0, isExpanded ? Object.entries(specifications).length : maxSpecsToShow)
                  .map(([key, value]) => {
                  // Check if value is an object (nested spec)
                  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    return (
                      <div key={key} className="py-1.5 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="font-bold text-gray-700 dark:text-gray-300">{key}:</span>
                        <div className="ml-4 mt-1 space-y-1">
                          {Object.entries(value).map(([subKey, subValue]) => {
                            // Check if subValue has a url property (nested link)
                            const hasUrl = typeof subValue === 'object' && subValue !== null && subValue.url
                            return (
                              <div key={subKey} className="flex items-start">
                                {hasUrl ? (
                                  <span className="text-gray-600 dark:text-gray-400">{renderValue(subValue, subKey)}</span>
                                ) : (
                                  <>
                                    <span className="font-bold text-gray-600 dark:text-gray-400 mr-2">{subKey}:</span>
                                    <span className="text-gray-600 dark:text-gray-400">{renderValue(subValue)}</span>
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
                    <div key={key} className="flex items-start py-1.5 px-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">{key}:</span>
                      <span className="text-gray-600 dark:text-gray-400">{renderValue(value)}</span>
                    </div>
                  )
                })}
              </div>
              
              {/* Expand/Collapse Button */}
              {Object.entries(specifications).length > maxSpecsToShow && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setIsExpanded(!isExpanded)
                  }}
                  className="w-full mt-3 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center justify-center gap-1"
                >
                  {isExpanded ? (
                    <>
                      Show Less
                      <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Show More ({Object.entries(specifications).length - maxSpecsToShow} more)
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
