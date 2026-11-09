import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const authorsDir = path.join(process.cwd(), 'data', 'authors')

export function getAllAuthors() {
  return fs
    .readdirSync(authorsDir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => ({
      ...matter(fs.readFileSync(path.join(authorsDir, file), 'utf8')).data,
      slug: file.replace(/\.mdx?$/, ''),
    }))
}
