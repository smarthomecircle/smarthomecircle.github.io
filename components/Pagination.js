import Link from '@/components/Link'

/**
 * @param {object} props
 * @param {number} props.totalPages
 * @param {number} props.currentPage
 * @param {string} [props.basePath] - e.g. '/sbc' for SBC list. Omit for main blog (page 1 = /, page n = /page/n).
 */
export default function Pagination({ totalPages, currentPage, basePath = '' }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)
  const prevHref =
    currentPage - 1 === 1
      ? basePath || '/'
      : basePath
        ? `${basePath}/page/${currentPage - 1}`
        : `/page/${currentPage - 1}`
  const nextHref = basePath
    ? `${basePath}/page/${currentPage + 1}`
    : `/page/${currentPage + 1}`

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        <div className="content-center">
          {!prevPage && (
            <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
              Previous
            </button>
          )}

          {prevPage && (
            <Link
              href={prevHref}
              className="m-1 py-3 px-8 leading-4 rounded uppercase hover:bg-teal-500 border border-teal-500 dark:border-teal-500"
            >
              <button rel="previous"> Previous </button>
            </Link>
          )}
        </div>
        <div className="content-center">
          <span className="border-b border-teal-500 py-3 px-4 ">
            {currentPage} of {totalPages}
          </span>
        </div>
        <div className="content-center">
          {!nextPage && (
            <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
              Next
            </button>
          )}
          {nextPage && (
            <Link
              href={nextHref}
              className=" px-10 py-3  leading-4 rounded uppercase text-white bg-teal-500 hover:bg-teal-600 dark:hover:bg-teal-400"
            >
              <button rel="next">Next &gt;</button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}
