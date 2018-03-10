import _ from 'lodash'

export function queryParams(params) {
  const queries = Object.keys(params).map(key => {
    if (!params[key])
      return null
    if (typeof(params[key]) === 'object')
      return parseObjectQueryParams(params, key)
    if (params[key])
      return parseQueryParam(params, key)

    return null
  })

  return _.compact(queries).join('&')
}

export function queryParamsList(params) {
  if (Object.keys(params).length === 0) return params

  let object = {}

  params.split(',').map(list => {
    const item = list.split(':')

    return object[item[0]] = item[1]
  })

  return object
}

function parseQueryParam(params, key) {
  return [key, encodeURIComponent(params[key])].join('=')
}

function parseObjectQueryParams(params, key) {
  if (Object.keys(params[key]).length) {
    const subParams = Object.keys(params[key]).map(subKey => {
      return parseSubQueryParams(params, key, subKey)
    }).join(',')

    return [key, encodeURIComponent(subParams)].join('=')
  }

  return undefined
}

function parseSubQueryParams(params, key, subKey) {
  if (params[key][subKey])
    return [
      subKey,
      encodeURIComponent(params[key][subKey])
    ].join(':')
}
