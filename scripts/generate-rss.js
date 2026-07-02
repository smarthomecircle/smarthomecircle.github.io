const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const siteMetadata = require('../data/siteMetadata')

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getAllFilesRecursively(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getAllFilesRecursively(fullPath))
      continue
    }

    if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push(fullPath)
    }
  }

  return files
}

function formatSlug(fileName) {
  return fileName.replace(/\.(mdx|md)$/, '').split('/').pop()
}

function kebabCaseTag(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function generateRssItem(post) {
  return `
  <item>
    <guid>${siteMetadata.siteUrl}/${post.slug}</guid>
    <title>${escapeXml(post.title || '')}</title>
    <link>${siteMetadata.siteUrl}/${post.slug}</link>
    ${post.summary ? `<description>${escapeXml(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${(post.tags || []).map((tag) => `<category>${escapeXml(tag)}</category>`).join('')}
  </item>
`
}

function generateRss(posts, { page = 'feed.xml', canonicalUrl = siteMetadata.siteUrl } = {}) {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escapeXml(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}</link>
      <description>${escapeXml(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      <atom:link href="${canonicalUrl}" rel="alternate" type="text/html"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`
}

function getAllPostFrontmatter() {
  const blogDir = path.join(process.cwd(), 'data', 'blog')
  const files = getAllFilesRecursively(blogDir)
  const posts = []

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(source)

    if (data.draft === true) {
      continue
    }

    const relativePath = filePath.slice(blogDir.length + 1).replace(/\\/g, '/')
    posts.push({
      ...data,
      slug: formatSlug(relativePath),
      date: data.date ? new Date(data.date).toISOString() : null,
    })
  }

  return posts.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
}

function buildTagFeedMap(posts) {
  const tagMap = new Map()

  for (const post of posts) {
    for (const tag of post.tags || []) {
      const key = kebabCaseTag(tag)
      if (!key) continue
      if (!tagMap.has(key)) {
        tagMap.set(key, [])
      }
      tagMap.get(key).push(post)
    }
  }

  return tagMap
}

;(function main() {
  const posts = getAllPostFrontmatter()
  if (posts.length === 0) {
    console.warn('No posts found. Skipping RSS generation.')
    return
  }

  fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true })
  fs.writeFileSync(path.join(process.cwd(), 'public', 'feed.xml'), generateRss(posts))

  const tagMap = buildTagFeedMap(posts)
  for (const [tag, tagPosts] of tagMap.entries()) {
    const tagPath = path.join(process.cwd(), 'public', 'tags', tag)
    fs.mkdirSync(tagPath, { recursive: true })
    fs.writeFileSync(
      path.join(tagPath, 'feed.xml'),
      generateRss(tagPosts, {
        page: `tags/${tag}/feed.xml`,
        canonicalUrl: `${siteMetadata.siteUrl}/tags/${tag}`,
      })
    )
  }

  console.log(`Generated RSS feeds: root + ${tagMap.size} tag feeds`)
})()
