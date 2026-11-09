/**
 * Picks the authors of a post from the list of all authors in data/authors.
 * A post can use `author: 'Akshata Prabhu'` (matched by name) or
 * `authors: ['akshata-prabhu']` (matched by file name); without either it gets `default`.
 * Kept free of Node imports so list components can call it in the browser too.
 */
export function getRequestedAuthors(frontMatter) {
  if (frontMatter.authors?.length) return [].concat(frontMatter.authors)
  if (frontMatter.author) return [frontMatter.author]
  return ['default']
}

export function findAuthor(key, allAuthors) {
  const wanted = String(key).trim().toLowerCase()
  return allAuthors.find(
    (author) => author.slug === wanted || author.name?.trim().toLowerCase() === wanted
  )
}

export default function resolveAuthors(frontMatter, allAuthors = []) {
  const found = getRequestedAuthors(frontMatter)
    .map((key) => findAuthor(key, allAuthors))
    .filter(Boolean)
  return found.length ? found : allAuthors.filter((author) => author.slug === 'default')
}
