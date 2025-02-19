import formatDate from '@/lib/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import FormattedSummary from './FormattedSummary'

export default function SbcListRecord({ frontMatter, authorDetails }) {
  const { slug, date, title, summary, tags, imageUrl } = frontMatter
  return (
    <div>
      <ul>
        <li key={slug} className="py-4">
          <article className="space-y-1 xl:space-y-0 xl:items-baseline">
            <div className="space-y-3 xl:grid xl:grid-cols-4">
              <div className="xl:col-span-2 xl:mr-4">
                <Link href={`/${slug}`} className="text-gray-900 dark:text-gray-100">
                  <Image
                    alt={title}
                    src={`${imageUrl}`}
                    className="object-cover object-center rounded-xl lg:h-58 md:h-36"
                    width={844}
                    height={406}
                  />
                </Link>
              </div>
              <div className="xl:col-span-2 grid grid-cols-2">
                <h1 className="text-2xl font-bold leading-8 tracking-tight col-span-2">
                  <Link href={`/${slug}`} className="text-gray-900 dark:text-gray-100">
                    <div>{title}</div>
                  </Link>
                </h1>
                {/* <div className="flex flex-wrap my-2 col-span-2">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div> */}
                <div className="prose text-black max-w-none dark:text-gray-200 col-span-2">
                <FormattedSummary summary={summary} />
                  <br />
                  <Link
                    href={`/${slug}`}
                    className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 ml-4 float-right"
                    aria-label={`Link to ${title}`}
                  >
                    Read more &rarr;
                  </Link>
                </div>
                <div className="mt-5 col-span-2 grid grid-cols-2">
                  <div className="col-span-1">
                  </div>
                  <div className="col-span-1">
                    {/* <time className="float-right" dateTime={date}>
                      {formatDate(date)}
                    </time> */}
                  </div>
                </div>
              </div>
              <br />
            </div>
            <hr />
          </article>
        </li>
      </ul>
    </div>
  )
}