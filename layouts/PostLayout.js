import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import AdColumn from '@/components/AdColumn'
import Script from 'next/script'
import AdsSection from '@/components/AdsSection'
import ShareButtons from '@/components/PostShare'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${slug}`)}`

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
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-100">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
                <div className="mt-6">
                  <div className="max-w-3xl mx-auto">
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <Image
                        alt={title}
                        src={imageUrl}
                        className="object-cover object-center rounded-2xl"
                        width={544}
                        height={407}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-primary-500 hover:text-primary-600 text-md dark:hover:text-primary-400">
                  {photoCredits != '' && photoCredits != null ? (
                    <Link href={photoCredits}> Photo Credits</Link>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="mt-2 text-gray-500 dark:text-gray-100">{readingTime.text}</div>
              </div>
            </div>
          </header>

          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38"
                          height="38"
                          alt="avatar"
                          unoptimized={true}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose text-lg leading-8	 dark:prose-dark max-w-none">
                <div>
                  {youtubeLink && (
                    <div className="xl:px-48 ">
                      <div className="relative w-full pt-[56.25%]">
                        <iframe
                          id={`youtubeLink1${date}`}
                          className="absolute top-0 left-0 w-full h-full"
                          src={youtubeLink}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <br />
                    </div>
                  )}
                </div>
                <div>
                  {youtubeLink2 && (
                    <div className="xl:px-48">
                      <iframe
                        id={`youtubeLink2${date}`}
                        className="w-full aspect-video"
                        src={youtubeLink2}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <br />
                    </div>
                  )}
                </div>
                <div>{children}</div>
                <div>
                  <ShareButtons title={title} url={`${siteMetadata.siteUrl}/${customUrl}`} />
                </div>
              </div>

              <hr />
              {/* <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div> */}
              {/* <Comments frontMatter={frontMatter} /> */}
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8 xl:mb-8 mb-4">
                <Link
                  href="/"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the articles
                </Link>
              </div>
              <div className="hidden xl:block">
                {/* <AdColumn
                  width="1054"
                  height="2100"
                  imageLink="/static/images/promotion/testing-spring-boot-applications-masterclass-architecture-524x733.png"
                  referalLink="https://www.copecart.com/products/521411d4/p/techapk42"
                /> */}
              </div>
              {/* <AdsSection id="ad3" slot="8862054574" /> */}
              {/* <AdsSection id="ad4" slot="6180491852" /> */}
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
