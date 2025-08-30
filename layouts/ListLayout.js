import { useState, useEffect } from 'react'
import React from 'react'
import Pagination from '@/components/Pagination'
import ListRecord from '@/components/ListRecord'
import Image from '@/components/Image'
import AdColumn from '@/components/AdColumn'
import Script from 'next/script'
import AdsSection from '@/components/AdsSection'
import { getBlogListSlot, getLayoutKey } from '@/components/MDXComponents'

// Wrapper component that only shows container when ad is present
function ConditionalAdContainer({ id, slot }) {
  const [hasAd, setHasAd] = useState(false)
  
  // Check if the ad slot is valid (not the placeholder)
  const isValidSlot = slot && !slot.includes('567890')
  
  useEffect(() => {
    // Set a timeout to check if ad loaded
    const timer = setTimeout(() => {
      if (isValidSlot) {
        setHasAd(true)
      }
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [isValidSlot])
  
  // Don't render container if no valid ad
  if (!isValidSlot) {
    return null
  }
  
  return (
    <div className="md:col-span-2 xl:col-span-3 my-8">
      <div className="bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
        <AdsSection id={id} slot={slot} layoutKey={getLayoutKey(slot)} />
      </div>
    </div>
  )
}
export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  authorDetails,
  pagination,
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts
  return (
    <>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {/* Main Content */}
        <div className="pt-8 space-y-12">
          {/* Articles Grid */}
          <div>
            {!filteredBlogPosts.length && (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg">
                  No posts found.
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  Try adjusting your search terms or browse all articles.
                </p>
              </div>
            )}
            
            {displayPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {displayPosts.map((frontMatter, index) => (
                  <React.Fragment key={frontMatter.slug || index}>
                    <ListRecord
                      frontMatter={frontMatter}
                      authorDetails={authorDetails}
                    />
                    {/* Insert ad after every 3rd post */}
                    {(index + 1) % 3 === 0 && index < displayPosts.length - 1 && (
                      <ConditionalAdContainer 
                        id={`blog-list-ad-${index}`} 
                        slot={getBlogListSlot(index)} 
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && !searchValue && (
              <div className="mt-16 flex justify-center">
                <Pagination 
                  currentPage={pagination.currentPage} 
                  totalPages={pagination.totalPages} 
                />
              </div>
            )}
          </div>

          {/* Newsletter/Subscribe Section - Commented out for later use */}
          {/*
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Don't Miss Our Latest Posts
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Subscribe to our newsletter and stay updated with the latest smart home tech trends and tutorials.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
                <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
    </>
  )
}
