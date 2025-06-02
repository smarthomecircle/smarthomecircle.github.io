const fs = require('fs')
const siteMetadata = require('../data/siteMetadata')

;(async () => {
  // globby is ESM-only since v12; load it dynamically from CJS.
  const { globby } = await import('globby')
  // prettier v3 also ships as an ES module, so load it dynamically as well.
  const prettier = (await import('prettier')).default

  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/*.js',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'data/devices/**/sbc/*.md',
    'public/tags/**/*.xml',
    '!pages/_*.js',
    '!pages/api',
  ])

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages/', '/')
                  .replace('devices/', '')
                  .replace('data/blog', '')
                  .replace('public/', '/')
                  .replace('2020/', '')
                  .replace('2021/', '')
                  .replace('2022/', '')
                  .replace('2023/', '')
                  .replace('2024/', '')
                  .replace('2025/', '')
                  .replace('2026/', '')
                  .replace('2027/', '')
                  .replace('2028/', '')
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '')
                const route = path === '/index' ? '' : path
                if (page === `pages/404.js` || page === `pages/[slug].js`) {
                  return
                }
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  // prettier v3 returns a Promise from `format()`.
  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  fs.writeFileSync('public/sitemap.xml', formatted)
})()
