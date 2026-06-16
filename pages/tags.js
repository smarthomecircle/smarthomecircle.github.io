import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import formatTagText from '@/lib/utils/formatTagText'
import kebabCase from '@/lib/utils/kebabCase'

export async function getStaticProps() {
  const tags = await getAllTags('blog')
  const allPosts = await getAllFilesFrontMatter('blog')
  const tagDisplayMap = {}

  allPosts.forEach((post) => {
    if (!post.tags) return

    post.tags.forEach((tag) => {
      const tagSlug = kebabCase(tag)
      if (!tagDisplayMap[tagSlug]) {
        tagDisplayMap[tagSlug] = tag
      }
    })
  })

  return { props: { tags, tagDisplayMap } }
}

export default function Tags({ tags, tagDisplayMap }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title="Tags" description="About all topics from this website." />
      <div className="flex flex-col mb-10 items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            const displayTag = tagDisplayMap?.[t] || t.split('-').join(' ')
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={formatTagText(displayTag)} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
