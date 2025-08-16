// components/Benchmarks.jsx
import Link from 'next/link'
import React from 'react'

export default function Benchmarks({ data = {} }) {
  const entries = Object.entries(data || {})
  if (!entries.length) return null

  /* ---------------- helpers ---------------- */
  const toLinksArray = (testData) => {
    if (Array.isArray(testData?.links)) {
      return testData.links
        .map((item) => {
          if (typeof item === 'string') return { text: 'Open link', href: item }
          if (item && typeof item === 'object') {
            const href = item.href || null
            if (!href) return null
            return { text: item.text || 'Open link', href }
          }
          return null
        })
        .filter(Boolean)
    }
    if (typeof testData?.url === 'string') {
      return [{ text: testData.linkText || 'View link', href: testData.url }]
    }
    return []
  }

  const toScreenshotsArray = (testData) => {
    const arr = Array.isArray(testData?.screenshots) ? testData.screenshots : []
    return arr
      .map((item) => {
        if (typeof item === 'string') return { src: item, alt: '', caption: '', href: item }
        if (item && typeof item === 'object') {
          const src = item.src || item.href
          if (!src) return null
          return { src, alt: item.alt || '', caption: item.caption || '', href: item.href || src }
        }
        return null
      })
      .filter(Boolean)
  }

  const renderBullets = (bulletList) =>
    bulletList.map((b, i) => {
      if (typeof b === 'object' && b !== null) {
        const key = Object.keys(b)[0]
        const value = b[key]
        return (
          <li key={i}>
            <span className="font-semibold">{key}:</span> {value}
          </li>
        )
      }
      return <li key={i}>{b}</li>
    })

  /* ---------------- render ---------------- */
  return (
    <section className="not-prose mt-10">
      <h2 className="text-2xl font-bold tracking-tight">Benchmarks</h2>
      <p className="mt-1 text-gray-600 dark:text-gray-300">
        Quick bullets, links (if provided), raw logs, and screenshots.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {entries.map(([testName, testData]) => {
          const bullets = Array.isArray(testData?.bullets) ? testData.bullets : null
          const raw = typeof testData?.raw === 'string' ? testData.raw : null
          const links = toLinksArray(testData)
          const shots = toScreenshotsArray(testData)

          let fallbackBullets = null
          if (!bullets && testData && typeof testData === 'object' && !Array.isArray(testData)) {
            fallbackBullets = Object.entries(testData)
              .filter(([k]) => !['bullets', 'url', 'raw', 'linkText', 'links', 'screenshots'].includes(k))
              .map(([k, v]) => ({ [k]: Array.isArray(v) ? v.join(', ') : String(v) }))
          }

          return (
            <div
              key={testName}
              className="rounded-2xl border border-gray-200/70 bg-white/80 shadow-sm ring-1 ring-black/[0.03]
                         dark:border-white/10 dark:bg-white/5 dark:ring-white/5"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="m-0 text-xl font-semibold tracking-tight">{testName}</h3>
              </div>

              {/* Body */}
              <div className="px-4 py-4">
                {(bullets || fallbackBullets)?.length ? (
                  <ul className="mb-3 list-disc space-y-1.5 pl-5 text-base leading-7 text-gray-900 dark:text-gray-100">
                    {renderBullets(bullets || fallbackBullets)}
                  </ul>
                ) : null}

                {/* LINKS with explicit styling */}
                {links.length > 0 && (
                  <div className="mb-3 flex flex-col gap-1">
                    {links.map(({ text, href }, i) => (
                      <Link
                        key={`${href}-${i}`}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {text || 'Open link'}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Raw output */}
                {raw && (
                  <details className="mt-4 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-50/70 text-base leading-7 dark:border-white/10 dark:bg-white/5">
                    <summary className="cursor-pointer select-none px-3 py-2 font-medium text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-white/10">
                      Raw output
                    </summary>
                    <div className="px-3 pb-3 pt-2">
                      <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs leading-relaxed text-gray-100 dark:bg-gray-800">
                        <code>{raw}</code>
                      </pre>
                    </div>
                  </details>
                )}

                {/* Screenshots */}
                {shots.length > 0 && (
                  <details className="mt-4 overflow-hidden rounded-lg border border-gray-200/70 bg-gray-50/70 text-base leading-7 dark:border-white/10 dark:bg-white/5">
                    <summary className="cursor-pointer select-none px-3 py-2 font-medium text-gray-700 hover:bg-gray-100/80 dark:text-gray-200 dark:hover:bg-white/10">
                      Screenshots ({shots.length})
                    </summary>
                    <div className="px-3 pb-3 pt-2">
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {shots.map(({ src, alt, caption, href }, idx) => (
                          <figure
                            key={idx}
                            className="rounded-md border border-gray-200/70 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/5"
                          >
                            <a href={href || src} target="_blank" rel="noopener noreferrer">
                              <img
                                src={src}
                                alt={alt || ''}
                                loading="lazy"
                                className="aspect-video w-full rounded object-cover"
                              />
                            </a>
                            {caption ? (
                              <figcaption className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                                {caption}
                              </figcaption>
                            ) : null}
                          </figure>
                        ))}
                      </div>
                    </div>
                  </details>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
