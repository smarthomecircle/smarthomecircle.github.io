import { getAllFilesFrontMatter } from '@/lib/mdx'
import Link from '@/components/Link'
import formatDate from '@/lib/utils/formatDate'
import { PageSEO } from '@/components/SEO'
import { getFileBySlug } from '@/lib/mdx'
import SBCListLayout from '@/layouts/SBCListLayout'

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('sbc')
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
        {/* Compare SBCs Button */}
        <div className="flex justify-end mb-4">
          <Link
            href="/sbc-compare"
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Compare SBCs
          </Link>
        </div>

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
