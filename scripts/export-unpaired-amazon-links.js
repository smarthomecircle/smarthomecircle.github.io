// Lists every Amazon US link (amazon.com, labelled "Amazon (Worldwide)") in data/blog and
// data/sales that has no Amazon DE link (amazon.de, labelled "Amazon (Germany)") next to it,
// and every DE link with no US link,
// as one CSV row per URL. Fill in the empty `us_url` / `de_url` cell to add the missing link.
//
// A link's store comes from where it redirects (the `goes_to` column of amazon-links.csv /
// original-amazon-links.csv, or a live lookup with --resolve), falling back to its label.
// "Next to it" means the same sale product, the same line, or the same block of link lines.
//
// Usage: node scripts/export-unpaired-amazon-links.js [--resolve] [output.csv]
//   --resolve  look up the store of links that are not in the CSVs above (needs network)

const fs = require('fs')
const path = require('path')
const {
  ROOT,
  SCAN_DIRS,
  AMAZON_URL,
  listFiles,
  storeFor,
  productOnLine,
  productAbove,
  resolveStore,
  csvCell,
} = require('./export-amazon-links')
const { parseCsv } = require('./replace-amazon-links')

const args = process.argv.slice(2)
const RESOLVE = args.includes('--resolve')
const OUTPUT = path.resolve(
  args.find((arg) => !arg.startsWith('--')) || path.join(ROOT, 'amazon-unpaired-links.csv')
)
const STORE_CSVS = ['amazon-links.csv', 'original-amazon-links.csv']
const SALES_FILE = path.join(ROOT, 'data/sales/amazon.js')
const BLOCK_GAP = 4

const HOST_STORES = { 'amazon.com': 'US', 'amazon.de': 'DE', 'amazon.co.uk': 'UK' }

function storeFromHost(host) {
  return HOST_STORES[(host || '').replace(/^www\./, '')] || null
}

function storeFromLabel(label) {
  if (/\b(US|Worldwide)\b/.test(label)) return 'US'
  if (/\b(DE|EU|Europe|Germany)\b/i.test(label)) return 'DE'
  if (/\bUK\b/.test(label)) return 'UK'
  return null
}

const knownHosts = new Map()
const knownProducts = new Map()
for (const name of STORE_CSVS) {
  const file = path.join(ROOT, name)
  if (!fs.existsSync(file)) continue
  for (const row of parseCsv(fs.readFileSync(file, 'utf8'))) {
    for (const url of [row.old_url, row.new_url].map((value) => (value || '').trim())) {
      if (!url) continue
      if (row.goes_to && !knownHosts.has(url)) knownHosts.set(url, row.goes_to.trim())
      if (row.product && !knownProducts.has(url)) knownProducts.set(url, row.product.trim())
    }
  }
}

// Each group is one set of links shown together: { location, product, links: [{ url, label }] }
const groups = []

const saleLines = fs.readFileSync(SALES_FILE, 'utf8').split('\n')
const saleLine = (url) => saleLines.findIndex((line) => line.includes(url)) + 1
for (const category of require(SALES_FILE).categories || []) {
  for (const product of category.products || []) {
    const links = (product.links || (product.url ? [{ label: '', url: product.url }] : []))
      .filter((link) => link.url && link.url.match(AMAZON_URL))
      .map((link) => ({ url: link.url, label: link.label || '' }))
    if (!links.length) continue
    groups.push({
      location: `sales/amazon.js:${saleLine(links[0].url)}`,
      product: product.name,
      links,
    })
  }
}

const salesDir = path.join(ROOT, 'data/sales')
for (const dir of SCAN_DIRS) {
  for (const file of listFiles(path.join(ROOT, dir))) {
    if (file.startsWith(salesDir)) continue
    const relative = path.relative(path.join(ROOT, 'data'), file)
    const lines = fs.readFileSync(file, 'utf8').split('\n')
    const frontMatterEnd = lines[0] === '---' ? lines.indexOf('---', 1) : -1
    let block = null

    lines.forEach((line, lineIndex) => {
      const inFrontMatter = lineIndex < frontMatterEnd
      if (!line.trim() || (inFrontMatter && line.trim().startsWith('#'))) {
        block = null
        return
      }
      const matches = [...line.matchAll(AMAZON_URL)]
      if (!matches.length) return

      const links = matches.map((match) => ({
        url: match[0],
        label: storeFor(lines, lineIndex, line.slice(0, match.index)),
      }))
      const product = () => {
        const before = line.slice(0, matches[0].index)
        return productOnLine(before) || productAbove(lines, lineIndex)
      }
      const location = `${relative}:${lineIndex + 1}`

      if (links.length > 1) {
        groups.push({ location, product: product(), links })
        block = null
      } else if (block && lineIndex - block.lastLine <= BLOCK_GAP) {
        block.links.push(...links)
        block.lastLine = lineIndex
      } else {
        block = { location, product: product(), links, lastLine: lineIndex }
        groups.push(block)
      }
    })
  }
}

;(async () => {
  const allUrls = [...new Set(groups.flatMap((group) => group.links.map((link) => link.url)))]

  if (RESOLVE) {
    const queue = allUrls.filter((url) => !knownHosts.has(url))
    const worker = async () => {
      for (let url = queue.shift(); url; url = queue.shift()) {
        knownHosts.set(url, await resolveStore(url))
      }
    }
    await Promise.all(Array.from({ length: 8 }, worker))
  }

  const unknown = new Set()
  const storeOf = (link) => {
    const store = storeFromHost(knownHosts.get(link.url)) || storeFromLabel(link.label)
    if (!store) unknown.add(link.url)
    return store
  }

  const rows = new Map()
  for (const group of groups) {
    const stores = group.links.map(storeOf)
    const urlsFor = (store) => group.links.filter((_, i) => stores[i] === store).map((l) => l.url)
    const byStore = { US: urlsFor('US'), DE: urlsFor('DE') }

    group.links.forEach((link, i) => {
      const has = stores[i]
      if (has !== 'US' && has !== 'DE') return
      const other = has === 'US' ? 'DE' : 'US'
      const row = rows.get(link.url) || {
        product: '',
        has,
        missing: other,
        url: link.url,
        labels: new Set(),
        places: [],
        paired: new Map(),
      }
      if (!row.product || group.location.startsWith('sales/')) {
        row.product = group.product || knownProducts.get(link.url) || row.product
      }
      row.labels.add(link.label)
      if (byStore[other].length)
        byStore[other].forEach((url) => row.paired.set(url, group.location))
      else if (!row.places.includes(group.location)) row.places.push(group.location)
      rows.set(link.url, row)
    })
  }

  const output = [...rows.values()]
    .filter((row) => row.places.length)
    .map((row) => {
      const [pairedUrl, pairedAt] = [...row.paired.entries()][0] || []
      return {
        product: row.product,
        missing: row.missing,
        us_url: row.has === 'US' ? row.url : pairedUrl || '',
        de_url: row.has === 'DE' ? row.url : pairedUrl || '',
        current_label: [...row.labels].join(' / '),
        missing_in: row.places.join('; '),
        note: pairedUrl
          ? `${row.missing} link prefilled from ${pairedAt}, where it already sits next to this ${row.has} link`
          : '',
      }
    })
    .sort((a, b) => a.missing.localeCompare(b.missing) || a.product.localeCompare(b.product))

  const header = ['product', 'missing', 'us_url', 'de_url', 'current_label', 'missing_in', 'note']
  const csv = [header, ...output.map((row) => header.map((key) => row[key]))]
    .map((cells) => cells.map(csvCell).join(','))
    .join('\n')
  fs.writeFileSync(OUTPUT, csv + '\n')

  for (const store of ['US', 'DE']) {
    const missing = output.filter((row) => row.missing === store)
    const places = missing.reduce((sum, row) => sum + row.missing_in.split('; ').length, 0)
    console.log(`${missing.length} links missing an Amazon ${store} link (${places} places)`)
  }
  console.log(`Wrote ${OUTPUT}`)
  if (unknown.size) {
    console.log(
      `\nCould not tell the store of ${unknown.size} links (run with --resolve to look them up):\n  ` +
        [...unknown].join('\n  ')
    )
  }
})()
