import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ShareButtons from '@/components/PostShare'
import Benchmarks from '@/components/Benchmarks'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const {
    slug,
    customUrl,
    date,
    title,
    tags,
    imageUrl,
    'photo-credits': photoCredits,
    readingTime,
    youtubeLink,
    youtubeLink2,
  } = frontMatter
  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/${customUrl}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        {/* Modern Hero Section */}
        <header className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-primary-900/20 -z-10"></div>
          
          <div className="relative pt-12 pb-16">
            {/* Breadcrumb / Category */}
            <div className="flex items-center justify-center mb-6">
              <Link href="/sbc" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Single Board Computer
              </Link>
            </div>

            {/* Title Section */}
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </time>
                </div>
                {readingTime && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {readingTime.text}
                  </div>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="max-w-5xl mx-auto mt-12">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10"></div>
                <Image
                  alt={title}
                  src={imageUrl}
                  className="object-cover object-center w-full h-auto"
                  width={800}
                  height={450}
                />
              </div>
              {photoCredits && (
                <div className="mt-3 text-center">
                  <Link 
                    href={photoCredits} 
                    className="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    Photo Credits
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Content */}
            <div className="lg:col-span-8">
              {/* Author Section - Above Content */}
              <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                  Written by
                </h3>
                <div className="flex items-center space-x-4">
                  {authorDetails.map((author) => (
                    <div key={author.name} className="flex items-center space-x-3">
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="48"
                          height="48"
                          alt={`${author.name} avatar`}
                          className="w-12 h-12 rounded-full ring-2 ring-white dark:ring-gray-700"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {author.name}
                        </div>
                        {author.twitter && (
                          <Link
                            href={author.twitter}
                            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                          >
                            {author.twitter.replace('https://twitter.com/', '@')}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg dark:prose-dark max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-blockquote:border-primary-500 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300">
                {/* YouTube Videos */}
                {youtubeLink && (
                  <div className="my-12 not-prose">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                      <iframe
                        id={`youtubeLink1${date}`}
                        className="absolute top-0 left-0 w-full h-full"
                        src={youtubeLink}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {youtubeLink2 && (
                  <div className="my-12 not-prose">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                      <iframe
                        id={`youtubeLink2${date}`}
                        className="absolute top-0 left-0 w-full h-full"
                        src={youtubeLink2}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Benchmarks */}
                {frontMatter.benchmarks && (
                  <div className="not-prose my-12">
                    <Benchmarks data={frontMatter.benchmarks} env={frontMatter.testEnv} />
                  </div>
                )}

                {/* Main Article Content */}
                {children}

                {/* Share Buttons */}
                <div className="not-prose mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Share this article
                    </h3>
                    <ShareButtons title={title} url={`${siteMetadata.siteUrl}/${customUrl}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="sticky top-8 space-y-8">
                {/* Tags */}
                {tags && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                {(next || prev) && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                      More Articles
                    </h3>
                    <div className="space-y-6">
                      {prev && (
                        <div>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Previous
                          </div>
                          <Link 
                            href={`/sbc/${prev.customUrl || prev.slug}`}
                            className="block group"
                          >
                            <div className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium group-hover:underline transition-colors">
                              {prev.title}
                            </div>
                          </Link>
                        </div>
                      )}
                      {next && (
                        <div>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            Next
                          </div>
                          <Link 
                            href={`/sbc/${next.customUrl || next.slug}`}
                            className="block group"
                          >
                            <div className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium group-hover:underline transition-colors">
                              {next.title}
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Back to Articles */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                  <Link
                    href="/sbc"
                    className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors group"
                  >
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to SBC Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
