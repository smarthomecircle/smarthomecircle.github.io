import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import Link from '@/components/Link'
import AffiliateLinks from '@/components/AffiliateLinks'

// Helper function to render value (handles URLs)
const renderValue = (value, label = null) => {
  if (!value) return <span className="text-gray-400">-</span>
  
  // Check if value is an object with a url property
  if (typeof value === 'object' && value !== null && value.url) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{label || 'Link'}</span>
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

export async function getStaticProps() {
  // Get all blog posts
  const allBlogPosts = await getAllFilesFrontMatter('blog')
  
  // Filter only posts with includeAsSBC object present
  const posts = allBlogPosts.filter(post => post.includeAsSBC && typeof post.includeAsSBC === 'object')
  
  return { props: { posts } }
}

export default function SBCCompare({ posts }) {
  const router = useRouter()
  const [selectedSBCs, setSelectedSBCs] = useState([null, null])
  const [copySuccess, setCopySuccess] = useState(false)
  
  // Helper to convert title to URL-friendly format (spaces to hyphens)
  const titleToUrlFormat = (title) => {
    return title
      .replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^a-zA-Z0-9\-]/g, '') // Remove special characters except hyphens
      .replace(/-+/g, '-')  // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  // Helper to convert URL format back to title (hyphens to spaces, also handles old %20 format)
  const urlFormatToTitle = (urlFormat) => {
    // First decode any URL encoding (for backward compatibility)
    const decoded = decodeURIComponent(urlFormat)
    // Replace hyphens with spaces
    return decoded.replace(/-/g, ' ')
  }

  // Pre-select SBCs from query parameters on mount and when query changes (using titles with hyphens)
  useEffect(() => {
    if (router.isReady) {
      const { sbc1, sbc2, sbc3, sbc4 } = router.query
      const preSelectedTitles = [sbc1, sbc2, sbc3, sbc4].filter(Boolean)
      
      if (preSelectedTitles.length > 0) {
        // Find posts by matching title (SBC title or post title)
        // Handle both hyphen format and old %20 format for backward compatibility
        const preSelected = preSelectedTitles.map(urlTitle => {
          // Convert URL format back to title
          const titleFromUrl = urlFormatToTitle(urlTitle)
          
          return posts.find(p => {
            const sbcTitle = p.includeAsSBC?.title || ''
            const postTitle = p.title || ''
            // Try exact match first, then try with spaces normalized
            return sbcTitle === titleFromUrl || 
                   postTitle === titleFromUrl ||
                   sbcTitle.replace(/\s+/g, ' ') === titleFromUrl.replace(/\s+/g, ' ') ||
                   postTitle.replace(/\s+/g, ' ') === titleFromUrl.replace(/\s+/g, ' ')
          }) || null
        })
        // Ensure we have at least 2 slots, pad with nulls if needed
        const padded = preSelected.length >= 2 ? preSelected : [...preSelected, ...Array(2 - preSelected.length).fill(null)]
        setSelectedSBCs(padded)
      } else {
        setSelectedSBCs([null, null])
      }
    }
  }, [router.isReady, router.query.sbc1, router.query.sbc2, router.query.sbc3, router.query.sbc4, posts])
  
  // Get all unique spec keys from only the SELECTED SBCs (including nested keys)
  const allSpecKeys = useMemo(() => {
    const keys = []
    const seenKeys = new Set()
    
    // Only process selected SBCs
    const selectedPosts = selectedSBCs.filter(sbc => sbc !== null)
    
    selectedPosts.forEach(post => {
      if (post.includeAsSBC?.specifications) {
        Object.entries(post.includeAsSBC.specifications).forEach(([key, value]) => {
          // If the value is an object (nested), check if it contains link properties
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Check if all sub-values are either link objects or simple values
            const hasOnlyLinks = Object.values(value).every(subValue => 
              (typeof subValue === 'object' && subValue !== null && subValue.url) || 
              typeof subValue === 'string'
            )
            
            if (hasOnlyLinks) {
              // If all are link properties or strings, treat as a single composite key
              if (!seenKeys.has(key)) {
                keys.push(key)
                seenKeys.add(key)
              }
            } else {
              // Otherwise, add as separate nested keys
              Object.keys(value).forEach(subKey => {
                const compositeKey = `${key}.${subKey}`
                if (!seenKeys.has(compositeKey)) {
                  keys.push(compositeKey)
                  seenKeys.add(compositeKey)
                }
              })
            }
          } else {
            if (!seenKeys.has(key)) {
              keys.push(key)
              seenKeys.add(key)
            }
          }
        })
      }
    })
    return keys
  }, [selectedSBCs])

  // Update URL with selected SBCs (using titles as query parameters with hyphens)
  const updateURL = (newSelected) => {
    const query = {}
    newSelected.forEach((sbc, index) => {
      if (sbc) {
        // Use SBC title or fallback to post title
        const title = sbc.includeAsSBC?.title || sbc.title
        if (title) {
          query[`sbc${index + 1}`] = titleToUrlFormat(title)
        }
      }
    })
    
    // Use shallow routing to update URL without page reload
    router.push(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    )
  }

  const handleSBCSelect = (index, slug) => {
    const newSelected = [...selectedSBCs]
    newSelected[index] = slug ? posts.find(p => p.slug === slug) : null
    setSelectedSBCs(newSelected)
    updateURL(newSelected)
  }

  const addComparison = () => {
    if (selectedSBCs.length < 4) {
      const newSelected = [...selectedSBCs, null]
      setSelectedSBCs(newSelected)
      updateURL(newSelected)
    }
  }

  const removeComparison = (index) => {
    if (selectedSBCs.length > 2) {
      const newSelected = selectedSBCs.filter((_, i) => i !== index)
      setSelectedSBCs(newSelected)
      updateURL(newSelected)
    }
  }

  // Copy comparison link to clipboard
  const copyComparisonLink = async () => {
    const query = {}
    selectedSBCs.forEach((sbc, index) => {
      if (sbc) {
        // Use SBC title or fallback to post title
        const title = sbc.includeAsSBC?.title || sbc.title
        if (title) {
          query[`sbc${index + 1}`] = titleToUrlFormat(title)
        }
      }
    })
    
    const url = new URL(`${siteMetadata.siteUrl}/sbc-compare`)
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
    
    try {
      await navigator.clipboard.writeText(url.toString())
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <>
      <PageSEO
        title="Compare Single Board Computers - SBC Comparison Tool"
        description="Compare specifications of different Single Board Computers (SBCs) side by side. Compare Raspberry Pi, Radxa, Orange Pi, and other SBCs."
        url={`${siteMetadata.siteUrl}/sbc-compare`}
      />
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Compare Single Board Computers
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Select SBCs to compare their specifications side by side
          </p>
        </div>

        <div className="py-8">
          {/* SBC Selectors */}
          <div className="mb-8 space-y-4">
            {/* Copy Link Button */}
            {selectedSBCs.some(sbc => sbc !== null) && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={copyComparisonLink}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  {copySuccess ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Comparison Link
                    </>
                  )}
                </button>
              </div>
            )}
            <div className="flex flex-wrap gap-4 items-end">
              {selectedSBCs.map((selectedSBC, index) => (
                <div key={index} className="flex-1 min-w-[250px]">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select SBC {index + 1}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={selectedSBC?.slug || ''}
                      onChange={(e) => handleSBCSelect(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">-- Select SBC --</option>
                      {posts.map((post) => (
                        <option 
                          key={post.slug} 
                          value={post.slug}
                          disabled={selectedSBCs.some((s, i) => i !== index && s?.slug === post.slug)}
                        >
                          {post.includeAsSBC?.title || post.title}
                        </option>
                      ))}
                    </select>
                    {selectedSBCs.length > 2 && (
                      <button
                        onClick={() => removeComparison(index)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title="Remove"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {selectedSBCs.length < 4 && (
                <button
                  onClick={addComparison}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add SBC
                </button>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedSBCs.some(sbc => sbc !== null) && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="sticky left-0 z-10 px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                      Specification
                    </th>
                    {selectedSBCs.map((sbc, index) => (
                      <th key={index} className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {sbc ? (
                          <div className="space-y-3">
                            {sbc.imageUrl && (
                              <div className="flex justify-center">
                                <Image
                                  src={sbc.imageUrl}
                                  alt={sbc.includeAsSBC?.title || sbc.title}
                                  width={150}
                                  height={100}
                                  className="rounded-lg object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <Link 
                                href={`/${sbc.slug}`}
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                              >
                                {sbc.includeAsSBC?.title || sbc.title}
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">No SBC Selected</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Price & Buy Links Row */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="sticky left-0 z-10 px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
                      Price
                    </td>
                    {selectedSBCs.map((sbc, index) => (
                      <td key={index} className="px-6 py-4 text-sm">
                        {sbc ? (
                          <div className="flex flex-col gap-2 items-center">
                            {sbc.includeAsSBC?.price && (
                              <div className="font-bold text-base text-gray-900 dark:text-gray-100 text-center">
                                {sbc.includeAsSBC.price}
                              </div>
                            )}
                            {sbc.affiliateLinks?.length > 0 && (
                              <div className="flex justify-center w-full">
                                <AffiliateLinks
                                  links={sbc.affiliateLinks.map(link => ({
                                    store: link.label,
                                    url: link.url
                                  }))}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-center block">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Specification Rows */}
                  {allSpecKeys.map((specKey) => {
                    // Check if this is a nested key (e.g., "GPU.support")
                    const isNested = specKey.includes('.')
                    const [parentKey, subKey] = isNested ? specKey.split('.') : [specKey, null]
                    
                    return (
                      <tr key={specKey} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="sticky left-0 z-10 px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
                          {isNested ? (
                            <span>
                              {parentKey} <span className="text-gray-500">→</span> {subKey}
                            </span>
                          ) : (
                            specKey
                          )}
                        </td>
                        {selectedSBCs.map((sbc, index) => {
                          let value
                          let displayLabel = null
                          if (isNested) {
                            value = sbc?.includeAsSBC?.specifications?.[parentKey]?.[subKey]
                            displayLabel = subKey
                          } else {
                            value = sbc?.includeAsSBC?.specifications?.[parentKey]
                            // If value is an object, check if it contains link properties
                            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                              // Check if all sub-values are either link objects or simple values
                              const hasOnlyLinks = Object.values(value).every(subValue => 
                                (typeof subValue === 'object' && subValue !== null && subValue.url) || 
                                typeof subValue === 'string'
                              )
                              
                              if (!hasOnlyLinks) {
                                value = null
                              }
                            }
                          }
                          
                          return (
                            <td key={index} className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 text-center">
                              {value && typeof value === 'object' && !value.url ? (
                                <div className="flex flex-col gap-1 items-center">
                                  {Object.entries(value).map(([itemKey, itemValue]) => (
                                    <div key={itemKey}>
                                      {renderValue(itemValue, itemKey)}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                renderValue(value, displayLabel)
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}

                  
                  {/* Full Review Row */}
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="sticky left-0 z-10 px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                      Full Review
                    </td>
                    {selectedSBCs.map((sbc, index) => (
                      <td key={index} className="px-6 py-4 text-sm text-center">
                        {sbc ? (
                          <Link
                            href={`/${sbc.slug}`}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200"
                          >
                            Read Full Review
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {!selectedSBCs.some(sbc => sbc !== null) && (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No SBCs selected</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select SBCs from the dropdowns above to compare their specifications
              </p>
            </div>
          )}

          {/* Back to SBC List */}
          <div className="mt-8 text-center">
            <Link
              href="/sbc"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to SBC List
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
