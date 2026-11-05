import { useState } from 'react'

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md border border-gray-300 dark:border-gray-600 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

/**
 * Discount codes that stack on top of sale prices.
 * @param {Array<{code: string, discount: string, minSpend: string, url?: string}>} codes
 */
export default function SaleCouponTable({ codes }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800/60 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Code
            </th>
            <th scope="col" className="px-4 py-3">
              You save
            </th>
            <th scope="col" className="px-4 py-3">
              Min. spend
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Copy</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {codes.map(({ code, discount, minSpend, url }) => (
            <tr key={code}>
              <td className="px-4 py-2.5">
                <code className="rounded bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 font-mono font-semibold text-primary-700 dark:text-primary-300">
                  {code}
                </code>
              </td>
              <td className="px-4 py-2.5 font-semibold text-gray-900 dark:text-gray-100">
                {discount}
              </td>
              <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">{minSpend}</td>
              <td className="px-4 py-2.5">
                <div className="flex items-center justify-end gap-2">
                  <CopyButton code={code} />
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="rounded-md bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
                    >
                      Shop
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
