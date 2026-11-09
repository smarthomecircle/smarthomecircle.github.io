// Lists every Amazon link in data/blog and data/sales as one CSV row per unique URL.
// Fill in the `new_url` column, then run `node scripts/replace-amazon-links.js`.
//
// Usage: node scripts/export-amazon-links.js [--resolve] [output.csv]
//   --resolve  follow each short link and add the Amazon store it opens (needs network)

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SCAN_DIRS = ['data/blog', 'data/sales']
const args = process.argv.slice(2)
const RESOLVE = args.includes('--resolve')
const OUTPUT = path.resolve(
  args.find((arg) => !arg.startsWith('--')) || path.join(ROOT, 'amazon-links.csv')
)

const AMAZON_URL = /https?:\/\/(?:www\.)?(?:amzn\.[a-z]+|amazon\.[a-z.]+)\/[^\s"'`)\]<>|]+/g
const LOOKBACK_LINES = 30

const GENERIC_TEXT =
  /^(amazon( (us|uk|de|eu|europe))?|buy (on|at) amazon|here|this|alt text|acrylic rack|conclusion.*)$/i

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFiles(full)
    return /\.(md|mdx|js)$/.test(entry.name) && entry.name !== 'README.md' ? [full] : []
  })
}

function clean(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*/g, '')
    .replace(/^(\d+\.|-)\s+/, '')
    .replace(/^Buy\s+/i, '')
    .replace(/^Amazon\s*-\s*/i, '')
    .replace(/:$/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function useful(text) {
  const value = clean(text || '')
  return value && !GENERIC_TEXT.test(value) && !/amazon/i.test(value) ? value : null
}

function storeFor(lines, lineIndex, before) {
  const sameLine = [...before.matchAll(/(?:store|label)\s*:\s*["']([^"']+)["']/g)].pop()
  if (sameLine) return sameLine[1]

  const prefix = before.match(/(Amazon(?: [A-Z]{2}|\s+Europe)?)\s*:\s*$/i)
  if (prefix) return prefix[1]

  const bold = before.match(/\*\*(Amazon(?: [A-Z]{2})?)[^*]*\*\*[^*]*$/)
  if (bold) return bold[1]

  const previous = (lines[lineIndex - 1] || '').match(/label\s*:\s*["']([^"']+)["']/)
  if (previous && /amazon/i.test(previous[1])) return previous[1]

  return 'Amazon'
}

function productOnLine(before) {
  const linkText = [...before.matchAll(/\[(?:!\[([^\]]*)\]\([^)]*\)|([^\]]+))\]\($/g)].pop()
  if (linkText) {
    const text = useful(linkText[1] || linkText[2])
    if (text) return text
  }

  const bold = [...before.matchAll(/\*\*([^*]+)\*\*/g)].map((m) => useful(m[1])).filter(Boolean)
  if (bold.length) return bold[0]

  const name = before.match(/name\s*:\s*["']([^"']+)["']/)
  return name ? name[1] : null
}

function productAbove(lines, lineIndex) {
  for (let i = lineIndex - 1; i >= Math.max(0, lineIndex - LOOKBACK_LINES); i--) {
    const line = lines[i]
    const patterns = [
      /\bname\s*:\s*["']([^"']+)["']/,
      /\btitle\s*=\s*["']([^"']+)["']/,
      /^\s*title\s*:\s*["']?([^"'\n]+?)["']?\s*$/,
      /^#{1,6}\s+(.+)$/,
      /^\s*(?:\d+\.|-)\s+\*\*([^*]+)\*\*/,
      /^\s*\*\*([^*]+)\*\*/,
      /^\s*-\s+(?![\w-]+\s*:)([A-Za-z].{3,120})$/,
      /\[!\[([^\]]+)\]/,
    ]
    for (const pattern of patterns) {
      const match = line.match(pattern)
      const text = match && useful(match[1])
      if (text) return text
    }
  }
  return ''
}

function mostCommon(values) {
  const counts = new Map()
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || ''
}

async function resolveStore(url) {
  try {
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(10000) })
    const location = response.headers.get('location')
    return location ? new URL(location).hostname.replace(/^www\./, '') : 'no redirect'
  } catch (error) {
    return `error: ${error.message}`
  }
}

function csvCell(value) {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

const links = new Map()

for (const dir of SCAN_DIRS) {
  for (const file of listFiles(path.join(ROOT, dir))) {
    const relative = path.relative(path.join(ROOT, 'data'), file)
    const lines = fs.readFileSync(file, 'utf8').split('\n')

    lines.forEach((line, lineIndex) => {
      for (const match of line.matchAll(AMAZON_URL)) {
        const url = match[0]
        const before = line.slice(0, match.index)
        const entry = links.get(url) || {
          stores: new Map(),
          saleProducts: [],
          lineProducts: [],
          nearbyProducts: [],
          usedIn: [],
        }

        const store = storeFor(lines, lineIndex, before)
        entry.stores.set(store, (entry.stores.get(store) || 0) + 1)
        const onLine = productOnLine(before)
        if (dir === 'data/sales') entry.saleProducts.push(onLine || productAbove(lines, lineIndex))
        else if (onLine) entry.lineProducts.push(onLine)
        else entry.nearbyProducts.push(productAbove(lines, lineIndex))

        const location = `${relative}:${lineIndex + 1}`
        if (!entry.usedIn.includes(location)) entry.usedIn.push(location)
        links.set(url, entry)
      }
    })
  }
}

const rows = [...links.entries()].map(([url, entry]) => {
  const stores = [...entry.stores.entries()].sort((a, b) => b[1] - a[1])
  const specific = stores.find(([store]) => store !== 'Amazon')
  return {
    old_url: url,
    new_url: '',
    store: (specific || stores[0])[0],
    product:
      mostCommon(entry.saleProducts.filter(Boolean)) ||
      mostCommon(entry.lineProducts) ||
      mostCommon(entry.nearbyProducts.filter(Boolean)),
    occurrences: entry.usedIn.length,
    used_in: entry.usedIn.join('; '),
  }
})

rows.sort((a, b) => a.product.localeCompare(b.product) || a.store.localeCompare(b.store))
;(async () => {
  const header = ['old_url', 'new_url', 'store', 'product', 'occurrences', 'used_in']

  if (RESOLVE) {
    header.splice(3, 0, 'goes_to')
    const queue = [...rows]
    const worker = async () => {
      for (let row = queue.shift(); row; row = queue.shift()) {
        row.goes_to = await resolveStore(row.old_url)
      }
    }
    await Promise.all(Array.from({ length: 8 }, worker))
  }

  const csv = [header, ...rows.map((row) => header.map((key) => row[key]))]
    .map((cells) => cells.map(csvCell).join(','))
    .join('\n')

  fs.writeFileSync(OUTPUT, csv + '\n')

  const total = rows.reduce((sum, row) => sum + row.occurrences, 0)
  console.log(`Wrote ${rows.length} unique Amazon links (${total} occurrences) to ${OUTPUT}`)
})()
