import { getAllFilesFrontMatter } from '@/lib/mdx'
import Link from '@/components/Link'
import formatDate from '@/lib/utils/formatDate'
import { PageSEO } from '@/components/SEO'
import { getFileBySlug } from '@/lib/mdx'
import SBCListLayout from '@/layouts/SBCListLayout'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('devices')
  const authorList = ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)
  return { props: { posts, authorDetails } }
}

export default function posts({ posts , authorDetails}) {
  var yearheader = ''
  return (
    <>
      <PageSEO
        title="Single Board Computer"
        description="Single Board Computer such as raspberry pi, rockchip, allwinner"
      />
      <div className="mb-8 ">

        <SBCListLayout
                posts={posts}
                initialDisplayPosts={posts}
                pagination={0}
                authorDetails={[]}
                title="Single Board Computer "
              />
      </div>
    </>
  )
}
