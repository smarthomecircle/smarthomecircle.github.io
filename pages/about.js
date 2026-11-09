import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'
const TEAM = ['default', 'akshata-prabhu']

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  const team = await Promise.all(
    TEAM.map(async (slug) => (await getFileBySlug('authors', [slug])).frontMatter)
  )
  return { props: { authorDetails, team } }
}

export default function About({ authorDetails, team }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
      team={team}
    />
  )
}
