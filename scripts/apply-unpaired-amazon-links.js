// Applies a filled-in copy of amazon-unpaired-links.csv (from export-unpaired-amazon-links.js):
//   1. At every place in `missing_in`, adds the missing store's link next to the existing one,
//      in the same format (sale product links, AffiliateLinks, front matter, markdown bullet).
//      US is listed before DE, labelled "Amazon (Worldwide)" / "Amazon (Germany)".
//   2. Every URL changed compared to the original export is replaced everywhere in data/blog
//      and data/sales, so a product keeps the same links on every page.
// Rows whose links conflict (one old URL given two new ones, or one URL used as both US and DE)
// are skipped and reported.
//
// Usage: node scripts/apply-unpaired-amazon-links.js [--dry-run] filled.csv [original.csv]
//   original.csv defaults to amazon-unpaired-links.csv

const fs = require('fs')
const path = require('path')
const { ROOT, SCAN_DIRS, listFiles } = require('./export-amazon-links')
const { parseCsv } = require('./replace-amazon-links')

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const [filledArg, originalArg] = args.filter((arg) => !arg.startsWith('--'))
if (!filledArg) {
  console.error('Usage: node scripts/apply-unpaired-amazon-links.js [--dry-run] filled.csv')
  process.exit(1)
}
const STORES = ['US', 'DE']
const COLUMN = { US: 'us_url', DE: 'de_url' }
const BLOCK_GAP = 4

const read = (file) => parseCsv(fs.readFileSync(path.resolve(file), 'utf8'))
const originals = new Map(
  read(originalArg || path.join(ROOT, 'amazon-unpaired-links.csv')).map((row) => [
    `${row.product}|${row.missing}`,
    row,
  ])
)

const rows = []
const problems = []
for (const row of read(filledArg)) {
  const original = originals.get(`${row.product}|${row.missing}`)
  if (!original) {
    problems.push(`${row.product} (${row.missing}): not in the original export`)
    continue
  }
  const has = row.missing === 'US' ? 'DE' : 'US'
  const urls = { US: (row.us_url || '').trim(), DE: (row.de_url || '').trim() }
  const before = { US: (original.us_url || '').trim(), DE: (original.de_url || '').trim() }
  if (!urls[row.missing]) continue
  const bad = STORES.filter((store) => !/^https?:\/\/\S+$/.test(urls[store]))
  if (bad.length) {
    problems.push(`${row.product} (${row.missing}): not a URL in ${bad.map((s) => COLUMN[s])}`)
    continue
  }
  rows.push({ ...row, has, urls, before, oldUrl: before[has], skip: null })
}

// One old URL must map to one new URL, and one URL must belong to one store.
const targets = new Map()
const storesOfUrl = new Map()
for (const row of rows) {
  for (const store of STORES) {
    const { [store]: from } = row.before
    const to = row.urls[store]
    if (from && from !== to) {
      targets.set(from, (targets.get(from) || new Set()).add(to))
    }
    storesOfUrl.set(to, (storesOfUrl.get(to) || new Set()).add(store))
  }
}
for (const row of rows) {
  for (const store of STORES) {
    const { [store]: from } = row.before
    const to = row.urls[store]
    if (from && targets.get(from)?.size > 1) {
      row.skip = `${from} is changed to different links: ${[...targets.get(from)].join(', ')}`
    } else if (storesOfUrl.get(to).size > 1) {
      row.skip = `${to} is used as both an Amazon US and an Amazon DE link`
    }
  }
}

const replacements = new Map()
for (const row of rows.filter((r) => !r.skip)) {
  for (const store of STORES) {
    const { [store]: from } = row.before
    if (from && from !== row.urls[store]) replacements.set(from, row.urls[store])
  }
}

const STORE_LABELS = { US: 'Amazon (Worldwide)', DE: 'Amazon (Germany)' }

function amazonLabel(label, store, existing) {
  if (existing && /^Amazon \(/.test(label)) return label
  return STORE_LABELS[store]
}

function bulletText(text, store) {
  if (/\bAmazon\b(?! \()/.test(text)) return text.replace(/\bAmazon\b/, STORE_LABELS[store])
  return `${text} - ${STORE_LABELS[store]}`
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Rewrites lines[index] (and the label line above it for front matter) to list both stores.
// Returns false when the line has no supported link format.
function addLink(lines, index, row) {
  const line = lines[index]
  const old = escapeRegExp(row.oldUrl)
  const entries = (make) => STORES.map((store) => make(store, row.urls[store], store === row.has))

  const saleLine = line.match(
    new RegExp(`^(\\s*)links: \\[\\{ label: '([^']*)', url: '${old}' \\}\\],\\s*$`)
  )
  if (saleLine) {
    const [, indent, label] = saleLine
    lines.splice(
      index,
      1,
      `${indent}links: [`,
      ...entries(
        (store, url, existing) =>
          `${indent}  { label: '${amazonLabel(label, store, existing)}', url: '${url}' },`
      ),
      `${indent}],`
    )
    return true
  }

  const objectLine = line.match(
    new RegExp(`^(\\s*)\\{ (label|store): (["'])([^"']*)\\3, url: \\3${old}\\3 \\}(,?)(.*)$`)
  )
  if (objectLine) {
    const [, indent, key, quote, label, comma, rest] = objectLine
    const made = entries(
      (store, url, existing) =>
        `${indent}{ ${key}: ${quote}${amazonLabel(label, store, existing)}${quote}, ` +
        `url: ${quote}${url}${quote} }`
    )
    lines.splice(index, 1, `${made[0]},`, `${made[1]}${comma}${rest}`)
    return true
  }

  const yamlUrl = line.match(new RegExp(`^(\\s*)url: (["']?)${old}\\2\\s*$`))
  const yamlLabel = yamlUrl && (lines[index - 1] || '').match(/^(\s*)- label: (["']?)(.*?)\2\s*$/)
  if (yamlLabel) {
    const [, labelIndent, quote, label] = yamlLabel
    const [, urlIndent] = yamlUrl
    lines.splice(
      index - 1,
      2,
      ...entries((store, url, existing) => [
        `${labelIndent}- label: ${quote}${amazonLabel(label, store, existing)}${quote}`,
        `${urlIndent}url: ${quote}${url}${quote}`,
      ]).flat()
    )
    return true
  }

  const bullet = line.match(
    new RegExp(`^(\\s*-\\s+)\\[(\\*\\*)?(.+?)(\\*\\*)?\\]\\(${old}\\)(.*)$`)
  )
  if (bullet) {
    const [, prefix, bold = '', text, , rest] = bullet
    const made = entries(
      (store, url) => `${prefix}[${bold}${bulletText(text, store)}${bold}](${url})`
    )
    lines.splice(index, 1, made[0], `${made[1]}${rest}`)
    return true
  }
  return false
}

// Picks the line to edit for a place: the listed line or the next lines of the same link block,
// preferring a link whose text mentions Amazon, and skipping image links.
function findLine(lines, lineNumber, url) {
  const candidates = []
  for (let i = lineNumber - 1; i < Math.min(lines.length, lineNumber + BLOCK_GAP); i++) {
    if (i >= lineNumber && !lines[i].trim()) break
    if (lines[i].includes(url) && !/\[!\[/.test(lines[i])) candidates.push(i)
  }
  const amazonText = candidates.find((i) => /\[(\*\*)?[^\]]*Amazon/.test(lines[i]))
  return amazonText ?? candidates[0] ?? -1
}

const edits = new Map()
for (const row of rows.filter((r) => !r.skip)) {
  for (const place of row.missing_in.split(';').map((value) => value.trim())) {
    const [file, line] = place.split(':')
    if (!edits.has(file)) edits.set(file, [])
    edits.get(file).push({ row, line: Number(line), place })
  }
}

let added = 0
const changed = new Map()
for (const [file, fileEdits] of edits) {
  const full = path.join(ROOT, 'data', file)
  const lines = fs.readFileSync(full, 'utf8').split('\n')
  fileEdits.sort((a, b) => b.line - a.line)
  for (const { row, line, place } of fileEdits) {
    const index = findLine(lines, line, row.oldUrl)
    if (index < 0 && /\[!\[/.test(lines[line - 1] || '')) continue
    if (index < 0) problems.push(`${row.product}: ${row.oldUrl} not found at ${place}`)
    else if (!addLink(lines, index, row)) {
      problems.push(`${row.product}: unsupported link format at ${place}: ${lines[index].trim()}`)
    } else added++
  }
  changed.set(full, lines.join('\n'))
}

let replaced = 0
const pattern = replacements.size
  ? new RegExp(
      [...replacements.keys()]
        .sort((a, b) => b.length - a.length)
        .map((url) => `${escapeRegExp(url)}(?![A-Za-z0-9_\\-/?=&%#])`)
        .join('|'),
      'g'
    )
  : null
for (const dir of SCAN_DIRS) {
  for (const file of listFiles(path.join(ROOT, dir))) {
    const original = changed.get(file) ?? fs.readFileSync(file, 'utf8')
    const updated = pattern
      ? original.replace(pattern, (url) => {
          replaced++
          return replacements.get(url)
        })
      : original
    if (updated !== fs.readFileSync(file, 'utf8')) changed.set(file, updated)
    else changed.delete(file)
  }
}

for (const [file, contents] of changed) {
  console.log(`${DRY_RUN ? 'Would update' : 'Updated'} ${path.relative(ROOT, file)}`)
  if (!DRY_RUN) fs.writeFileSync(file, contents)
}
console.log(
  `\n${DRY_RUN ? 'Would add' : 'Added'} ${added} missing links and ` +
    `${DRY_RUN ? 'would replace' : 'replaced'} ${replaced} changed links (${replacements.size} URLs).`
)

const skipped = rows.filter((row) => row.skip)
if (skipped.length) {
  console.log(`\nSkipped ${skipped.length} rows:`)
  for (const row of skipped) console.log(`  ${row.product} (missing ${row.missing}): ${row.skip}`)
}
if (problems.length) console.log(`\nProblems:\n  ${problems.join('\n  ')}`)
