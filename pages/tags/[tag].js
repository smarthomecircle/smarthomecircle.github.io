import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

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

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, {
      page: `tags/${tagParam}/feed.xml`,
      canonicalUrl: `${siteMetadata.siteUrl}/tags/${tagParam}`,
    })
    const rssPath = path.join(root, 'public', 'tags', tagParam)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }
  // TODO: Fix this
  const authorList = ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  return { props: { posts: filteredPosts, tag: tagParam, authorDetails: authorDetails } }
}

export default function Tag({ posts, authorDetails, tag }) {
  // Human-friendly title: "Raspberry pi" from "raspberry-pi"
  // Capitalize first letter and convert space to dash
  const humanTitle =
    tag && tag.length
      ? tag.split('-').join(' ').replace(/^./, (c) => c.toUpperCase())
      : 'Tag'

  return (
    <>
      <TagSEO title={humanTitle} description={`${humanTitle} tags`} />
      <ListLayout posts={posts} authorDetails={authorDetails} title={humanTitle} />
    </>
  )
}
