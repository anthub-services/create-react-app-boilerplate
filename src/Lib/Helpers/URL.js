export function parse(search) {
  search = search.substr(1).split('&')

  let object = {}

  if (search.length > 0) {
    search.map(s => {
      const keyVal = s.split('=')

      return object[keyVal[0]] = decodeURIComponent(keyVal[1])
    })
  }

  return object
}
