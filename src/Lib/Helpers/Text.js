export function ucFirst(string) {
  if (!string) return null

  return [string.charAt(0).toUpperCase(), string.slice(1)].join('')
}
