import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ShareButtons from '@/components/PostShare'
import ImageLightbox from '@/components/ImageLightbox'

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
    suggestedArticles,
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
                          <Link href="/" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Blog Article
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
            {imageUrl && (
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
            )}
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

              {/* Featured Video Section */}
              {(youtubeLink || youtubeLink2) && (
                <div className="mb-12 space-y-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Featured Video</h3>
                  
                  {youtubeLink && (
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        id={`youtubeLink1${date}`}
                        className="absolute top-0 left-0 w-full h-full"
                        src={youtubeLink}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Featured video player"
                      ></iframe>
                    </div>
                  )}

                  {youtubeLink2 && (
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        id={`youtubeLink2${date}`}
                        className="absolute top-0 left-0 w-full h-full"
                        src={youtubeLink2}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Featured video player 2"
                      ></iframe>
                    </div>
                  )}
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg dark:prose-dark max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-blockquote:border-primary-500 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300">
                {/* Main Article Content */}
                {children}

                {/* Suggested Articles - Seamless Integration (Desktop Only) */}
                {suggestedArticles && suggestedArticles.length > 0 && (
                  <div className="mt-12 hidden lg:block">
                    
                    {/* Subtle divider */}
                    <div className="flex items-center my-8">
                      <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">You might also enjoy these related guides and reviews:</p>
                    
                    <div className="space-y-3">
                      {suggestedArticles.map((article, index) => (
                        <a
                          key={index}
                          href={article.url}
                          className="group flex items-center space-x-3 py-1 px-0 transition-all duration-200"
                        >
                          <div className="flex-shrink-0">
                            <svg className="w-4 h-4 text-primary-600 dark:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium underline hover:no-underline cursor-pointer">
                              {article.title}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="not-prose mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">
                      Share this article:
                    </h3>
                    <ShareButtons title={title} url={`${siteMetadata.siteUrl}/${customUrl}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="space-y-8">
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





                {/* Suggested Articles */}
                {suggestedArticles && suggestedArticles.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                      Suggested Articles
                    </h3>
                    <div className="space-y-6">
                      {suggestedArticles.map((article, index) => (
                        <div key={index}>
                          <a
                            href={article.url}
                            className="block group"
                          >
                            <div className="flex items-start space-x-3">
                              <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <div className="flex-1 min-w-0">
                                <div className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium group-hover:underline transition-colors">
                                  {article.title}
                                </div>
                              </div>
                              <svg className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back to Articles */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
                  <Link
                    href="/"
                    className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold transition-colors group"
                  >
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <ImageLightbox />
    </SectionContainer>
  )
}
