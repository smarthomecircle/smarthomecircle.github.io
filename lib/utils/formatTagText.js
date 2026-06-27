const capitalizeFirstLetter = (word) => {
  if (!word) return word
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export default function formatTagText(text = '') {
  return text
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ')
}
