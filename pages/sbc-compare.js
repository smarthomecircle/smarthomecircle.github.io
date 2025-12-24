import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import Link from '@/components/Link'
import AffiliateLinks from '@/components/AffiliateLinks'

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
  
  // Parse markdown links in the text
  return <span className="whitespace-pre-line">{parseMarkdownLinks(stringValue)}</span>
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
  
  // Get all unique spec keys from only the SELECTED SBCs (parent keys and nested sub-keys as separate rows)
  const allSpecKeys = useMemo(() => {
    // Only process selected SBCs
    const selectedPosts = selectedSBCs.filter(sbc => sbc !== null)
    
    // Maps to store all keys and their relationships
    const parentKeyMap = new Map() // key -> { entry, hasSubKeys, firstSeenIndex }
    const subKeysMap = new Map() // parentKey -> array of { subKey, entry }
    const seenParentKeys = new Set()
    const seenSubKeys = new Set() // tracks "parentKey.subKey" combinations
    const keyOrder = [] // Track the order parent keys first appear
    
    // First pass: collect all keys from all selected SBCs
    selectedPosts.forEach(post => {
      if (post.includeAsSBC?.specifications) {
        Object.entries(post.includeAsSBC.specifications).forEach(([key, value]) => {
          // Track parent key order (only on first appearance)
          if (!seenParentKeys.has(key)) {
            seenParentKeys.add(key)
            keyOrder.push(key)
          }
          
          // If the value is an object (nested), check if it contains sub-keys that should be displayed separately
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Check if all sub-values are link objects (with url property)
            const hasOnlyLinkObjects = Object.values(value).every(subValue => 
              typeof subValue === 'object' && subValue !== null && subValue.url
            )
            
            if (hasOnlyLinkObjects) {
              // If all are link objects, treat as a single composite key (e.g., Operating System with multiple OS links)
              if (!parentKeyMap.has(key)) {
                parentKeyMap.set(key, { 
                  entry: { key, isParent: true, subKeys: null }, 
                  hasSubKeys: false 
                })
              }
            } else {
              // This parent key has sub-keys that should be displayed separately
              if (!parentKeyMap.has(key)) {
                parentKeyMap.set(key, { 
                  entry: { key, isParent: true, hasSubKeys: true }, 
                  hasSubKeys: true 
                })
              } else {
                // Update existing entry to mark it has sub-keys
                const existing = parentKeyMap.get(key)
                if (!existing.hasSubKeys) {
                  existing.entry.hasSubKeys = true
                  existing.hasSubKeys = true
                }
              }
              
              // Collect all sub-keys for this parent
              if (!subKeysMap.has(key)) {
                subKeysMap.set(key, [])
              }
              
              Object.keys(value).forEach(subKey => {
                const subKeyId = `${key}.${subKey}`
                if (!seenSubKeys.has(subKeyId)) {
                  seenSubKeys.add(subKeyId)
                  subKeysMap.get(key).push({
                    subKey,
                    entry: { key, subKey, isParent: false, parentKey: key }
                  })
                }
              })
            }
          } else {
            // Simple value (not an object)
            if (!parentKeyMap.has(key)) {
              parentKeyMap.set(key, { 
                entry: { key, isParent: true, subKeys: null }, 
                hasSubKeys: false 
              })
            }
          }
        })
      }
    })
    
    // Build final array: parent keys followed immediately by their sub-keys, in order of first appearance
    const sortedKeys = []
    
    keyOrder.forEach(key => {
      const parentData = parentKeyMap.get(key)
      if (parentData) {
        // Add parent key
        sortedKeys.push(parentData.entry)
        
        // Immediately add all its sub-keys (if any)
        if (parentData.hasSubKeys && subKeysMap.has(key)) {
          const subKeys = subKeysMap.get(key)
          subKeys.forEach(({ entry }) => {
            sortedKeys.push(entry)
          })
        }
      }
    })
    
    return sortedKeys
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
                  {/* Price Row */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="sticky left-0 z-10 px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
                      Price
                    </td>
                    {selectedSBCs.map((sbc, index) => (
                      <td key={index} className="px-6 py-4 text-sm text-center">
                        {sbc ? (
                          sbc.includeAsSBC?.price ? (
                            <div className="font-bold text-base text-gray-900 dark:text-gray-100">
                              {sbc.includeAsSBC.price}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Buy Links Row */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="sticky left-0 z-10 px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
                      Where to Buy
                    </td>
                    {selectedSBCs.map((sbc, index) => (
                      <td key={index} className="px-6 py-4 text-sm text-center">
                        {sbc ? (
                          sbc.affiliateLinks?.length > 0 ? (
                            <div className="flex justify-center gap-2 flex-wrap">
                              {sbc.affiliateLinks.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer nofollow"
                                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Specification Rows */}
                  {allSpecKeys.map((specEntry, idx) => {
                    const { key, subKey, isParent, parentKey, hasSubKeys } = specEntry
                    const isSubKeyRow = !isParent && subKey
                    
                    return (
                      <tr key={isSubKeyRow ? `${parentKey}.${subKey}` : key} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className={`sticky left-0 z-10 px-6 ${isSubKeyRow ? 'py-2' : 'py-4'} text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700`}>
                          {isSubKeyRow ? (
                            <div className="pl-4 text-gray-600 dark:text-gray-400">
                              {subKey}
                            </div>
                          ) : (
                            <span className="font-semibold">{key}</span>
                          )}
                        </td>
                        {selectedSBCs.map((sbc, index) => {
                          let value
                          let shouldShowEmpty = false
                          
                          if (isSubKeyRow) {
                            // For sub-key rows, get the specific sub-key value
                            value = sbc?.includeAsSBC?.specifications?.[parentKey]?.[subKey]
                          } else {
                            // For parent rows, get the parent value
                            value = sbc?.includeAsSBC?.specifications?.[key]
                            
                            // If this parent key has sub-keys that will be displayed separately
                            if (hasSubKeys) {
                              // If the value exists and is an object (not a string), show empty cell
                              // because the sub-keys will be displayed in separate rows below
                              if (value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
                                shouldShowEmpty = true
                                value = null
                              }
                            } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                              // Check if all sub-values are link objects (with url property)
                              const hasOnlyLinkObjects = Object.values(value).every(subValue => 
                                typeof subValue === 'object' && subValue !== null && subValue.url
                              )
                              
                              // If it has sub-keys that will be shown separately, don't show the parent value
                              if (!hasOnlyLinkObjects) {
                                shouldShowEmpty = true
                                value = null
                              }
                            }
                          }
                          
                          return (
                            <td key={index} className={`px-6 ${isSubKeyRow ? 'py-2' : 'py-4'} text-sm text-gray-700 dark:text-gray-300 text-center`}>
                              {shouldShowEmpty ? (
                                // Empty cell for parent keys that have sub-keys
                                <span></span>
                              ) : value && typeof value === 'object' && !value.url && !isSubKeyRow ? (
                                // Display as composite (all links or strings) for parent row
                                <div className="flex flex-col gap-1 items-center">
                                  {Object.entries(value).map(([itemKey, itemValue]) => (
                                    <div key={itemKey}>
                                      {renderValue(itemValue, itemKey)}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                // Simple value or sub-key value
                                renderValue(value)
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
