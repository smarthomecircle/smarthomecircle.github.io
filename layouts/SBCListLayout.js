import { useState } from 'react'
import Pagination from '@/components/Pagination'
import SbcListRecord from '@/components/SbcListRecord'
export default function SBCListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  authorDetails,
  pagination,
  basePath = '',
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
          {/* SBC Cards Grid */}
          <div>
            {!filteredBlogPosts.length && (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg">
                  No SBCs found.
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  Try adjusting your search terms or browse all single board computers.
                </p>
              </div>
            )}

            {displayPosts.length > 0 && (
              <>
                {/* Mobile: Card Grid */}
                <div className="block md:hidden">
                  <div className="grid grid-cols-1 gap-6">
                    {displayPosts.map((frontMatter) => (
                      <SbcListRecord
                        key={frontMatter.slug || frontMatter.title}
                        frontMatter={frontMatter}
                        authorDetails={authorDetails}
                        layout="card"
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop: Horizontal List */}
                <div className="hidden md:block">
                  <div className="space-y-8">
                    {displayPosts.map((frontMatter) => (
                      <SbcListRecord
                        key={frontMatter.slug || frontMatter.title}
                        frontMatter={frontMatter}
                        authorDetails={authorDetails}
                        layout="horizontal"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && !searchValue && (
              <div className="mt-16 flex justify-center">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  basePath={basePath}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
