import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { getAllAuthors } from '@/lib/authors'
import resolveAuthors, { findAuthor, getRequestedAuthors } from '@/lib/utils/resolveAuthors'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getFiles('blog')
  const urls = posts.map((locations) =>
    locations
      .split('/') // These two were added to get only the last part of the file name
      .pop()
  )
  return {
    paths: urls.map((p) => ({
      params: {
        slug: formatSlug(p),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog')
  // const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const postIndex = allPosts.findIndex((post) => post.customUrl === params.slug)
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const currentPost = allPosts[postIndex] || null
  // const post = await getFileBySlug('blog', params.slug.join('/'))

  const post = await getFileBySlug('blog', currentPost.actualUrl)

  const allAuthors = getAllAuthors()
  const unknownAuthors = getRequestedAuthors(post.frontMatter).filter(
    (author) => !findAuthor(author, allAuthors)
  )
  if (unknownAuthors.length) {
    throw new Error(
      `Unknown author ${unknownAuthors.join(', ')} in post "${params.slug}". ` +
        `Use a name or file name from data/authors: ${allAuthors
          .map((author) => `${author.name} (${author.slug})`)
          .join(', ')}`
    )
  }
  const authorDetails = resolveAuthors(post.frontMatter, allAuthors)

  return { props: { post, authorDetails, prev, next } }
}

export default function Blog({ post, authorDetails, prev, next }) {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
