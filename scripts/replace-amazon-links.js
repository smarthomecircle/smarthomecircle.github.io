// Applies the `new_url` column of amazon-links.csv (from export-amazon-links.js) to
// data/blog and data/sales. Rows with an empty `new_url` are left unchanged.
//
// Usage: node scripts/replace-amazon-links.js [--dry-run] [input.csv]
//   --dry-run  print what would change without writing any files

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SCAN_DIRS = ['data/blog', 'data/sales']
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const INPUT = path.resolve(
  args.find((arg) => !arg.startsWith('--')) || path.join(ROOT, 'amazon-links.csv')
)

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false

  const endCell = () => {
    row.push(cell)
    cell = ''
  }
  const endRow = () => {
    endCell()
    rows.push(row)
    row = []
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') cell += text[++i]
      else if (char === '"') quoted = false
      else cell += char
    } else if (char === '"') quoted = true
    else if (char === ',') endCell()
    else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++
      endRow()
    } else cell += char
  }
  if (cell || row.length) endRow()

  const [header, ...body] = rows.filter((cells) => cells.some((value) => value.trim()))
  return body.map((cells) => Object.fromEntries(header.map((key, i) => [key.trim(), cells[i]])))
}

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFiles(full)
    return /\.(md|mdx|js)$/.test(entry.name) && entry.name !== 'README.md' ? [full] : []
  })
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const replacements = new Map()
const problems = []

for (const row of parseCsv(fs.readFileSync(INPUT, 'utf8'))) {
  const oldUrl = (row.old_url || '').trim()
  const newUrl = (row.new_url || '').trim()
  if (!oldUrl || !newUrl || oldUrl === newUrl) continue
  if (!/^https?:\/\/\S+$/.test(newUrl)) problems.push(`Not a URL for ${oldUrl}: "${newUrl}"`)
  else replacements.set(oldUrl, newUrl)
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error('\nFix these rows in the CSV and run again. Nothing was changed.')
  process.exit(1)
}

if (!replacements.size) {
  console.log(`No rows with a new_url in ${INPUT}. Nothing to do.`)
  process.exit(0)
}

// Longest first, and never followed by another URL character, so one short link is
// never replaced inside a longer one.
const pattern = new RegExp(
  [...replacements.keys()]
    .sort((a, b) => b.length - a.length)
    .map((url) => `${escapeRegExp(url)}(?![A-Za-z0-9_\\-/?=&%#])`)
    .join('|'),
  'g'
)

const replacedCount = new Map()
let changedFiles = 0

for (const dir of SCAN_DIRS) {
  for (const file of listFiles(path.join(ROOT, dir))) {
    const original = fs.readFileSync(file, 'utf8')
    let count = 0
    const updated = original.replace(pattern, (url) => {
      count++
      replacedCount.set(url, (replacedCount.get(url) || 0) + 1)
      return replacements.get(url)
    })
    if (!count) continue

    changedFiles++
    console.log(`${DRY_RUN ? 'Would update' : 'Updated'} ${path.relative(ROOT, file)} (${count})`)
    if (!DRY_RUN) fs.writeFileSync(file, updated)
  }
}

const total = [...replacedCount.values()].reduce((sum, n) => sum + n, 0)
console.log(
  `\n${DRY_RUN ? 'Would replace' : 'Replaced'} ${total} links in ${changedFiles} files ` +
    `(${replacedCount.size} of ${replacements.size} URLs from the CSV).`
)

const unused = [...replacements.keys()].filter((url) => !replacedCount.has(url))
if (unused.length) console.log(`Not found in any file:\n  ${unused.join('\n  ')}`)
