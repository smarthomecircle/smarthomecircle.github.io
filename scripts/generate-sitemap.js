const fs = require('fs')
const path = require('path')
const globby = require('globby')
const prettier = require('prettier')
const matter = require('gray-matter')
const siteMetadata = require('../data/siteMetadata')

// Helper to get all files recursively
function getAllFilesRecursively(dir) {
  const files = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...getAllFilesRecursively(fullPath))
    } else if (item.isFile() && (item.name.endsWith('.md') || item.name.endsWith('.mdx'))) {
      files.push(fullPath)
    }
  }
  
  return files
}

// Get all SBC posts from blog directory
function getSBCPosts() {
  const blogDir = path.join(process.cwd(), 'data', 'blog')
  const files = getAllFilesRecursively(blogDir)
  const posts = []
  
  files.forEach(file => {
    try {
      const source = fs.readFileSync(file, 'utf8')
      const { data: frontmatter } = matter(source)
      
      if (frontmatter.includeAsSBC && typeof frontmatter.includeAsSBC === 'object') {
        posts.push({
          includeAsSBC: frontmatter.includeAsSBC,
          title: frontmatter.title,
        })
      }
    } catch (error) {
      // Skip files that can't be read
    }
  })
  
  return posts
}

// Helper function to generate combinations
function generateCombinations(arr, size) {
  if (size === 0) return [[]]
  if (arr.length === 0) return []
  
  const [first, ...rest] = arr
  const withFirst = generateCombinations(rest, size - 1).map(combo => [first, ...combo])
  const withoutFirst = generateCombinations(rest, size)
  return [...withFirst, ...withoutFirst]
}

// Helper to encode title for URL (replace spaces with hyphens)
function encodeTitle(title) {
  return title
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9\-]/g, '') // Remove special characters except hyphens
    .replace(/-+/g, '-')  // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  const pages = await globby([
    'pages/*.js',
    'data/blog/**/*.mdx',
    'data/blog/**/*.md',
    'data/sbc/**/*.md',
    'public/tags/**/*.xml',
    '!pages/_*.js',
    '!pages/api',
  ])

  // Get all SBC posts for comparison URLs
  let comparisonUrls = []
  try {
    const sbcPosts = getSBCPosts()
    
    // Generate comparison URLs for 2, 3, and 4 SBC combinations
    for (let count = 2; count <= 4; count++) {
      const combinations = generateCombinations(sbcPosts, count)
      combinations.forEach(combo => {
        const params = combo.map((post, index) => {
          const title = post.includeAsSBC?.title || post.title
          return `sbc${index + 1}=${encodeTitle(title)}`
        }).join('&')
        comparisonUrls.push(`/sbc-compare?${params}`)
      })
    }
    console.log(`Generated ${comparisonUrls.length} SBC comparison URLs for sitemap`)
  } catch (error) {
    console.warn('Error generating SBC comparison URLs for sitemap:', error.message)
  }

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages/', '/')
                  .replace('data/sbc/', '/sbc/')
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
            ${comparisonUrls.map(url => `
                        <url>
                            <loc>${siteMetadata.siteUrl}${url}</loc>
                        </url>
                    `).join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
