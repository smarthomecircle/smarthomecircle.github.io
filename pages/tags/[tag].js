import { TagSEO } from '@/components/SEO'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllAuthors } from '@/lib/authors'
import { getAllTags } from '@/lib/tags'
import formatTagText from '@/lib/utils/formatTagText'
import kebabCase from '@/lib/utils/kebabCase'

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // ✅ Always take the tag from params
  const tagParam = Array.isArray(params?.tag) ? params.tag[0] : params?.tag

  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tagParam)
  )

  const authorDetails = getAllAuthors()

  return { props: { posts: filteredPosts, tag: tagParam, authorDetails: authorDetails } }
}

export default function Tag({ posts, authorDetails, tag }) {
  const matchingTagFromPost =
    posts
      ?.flatMap((post) => post.tags || [])
      .find((postTag) => kebabCase(postTag) === tag) || tag?.split('-').join(' ')

  const humanTitle =
    matchingTagFromPost && matchingTagFromPost.length ? formatTagText(matchingTagFromPost) : 'Tag'

  return (
    <>
      <TagSEO title={humanTitle} description={`${humanTitle} tags`} />
      <ListLayout posts={posts} authorDetails={authorDetails} title={humanTitle} />
    </>
  )
}
