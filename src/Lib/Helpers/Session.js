import _ from 'lodash'
import Store from 'store'
import JWT from 'jsonwebtoken'
import Axios from '../Common/Axios'

export function store(data) {
  for (const key in data) {
    Store.set(key, data[key])
  }
}

export function hash(index) {
  const hashList = process.env.REACT_APP_HASH.split('.')

  if (index) index = parseInt(index.toString().charAt(index.toString().length - 1), 10)
  else index = _.random(0, hashList.length - 1)

  return [
    hashList[index],
    [_.random(1111111, 9999999), index].join('')
  ]
}

export function isSignedIn() {
  token()
  ? Axios.defaults.headers.common['Authorization'] = `Bearer ${token()}`
  : delete Axios.defaults.headers.common['Authorization']

  return !!token()
}

export function isSignedOut() {
  return !isSignedIn()
}

export function isAdmin() {
  return userRole() === 'admin'
}

export function adminIsSignedIn() {
  return isSignedIn() && isAdmin()
}

export function isUser() {
  return userRole() !== 'admin'
}

export function userIsSignedIn() {
  if (adminIsSignedIn()) return true
  return isSignedIn() && isUser()
}

export function userRole() {
  const role = Store.get('role')

  return role === 'admin' ? '' : role
}

/* PAGE ACCESS */

export function showPage(path) {
  const allowedPaths = getData('allowedPaths')
  const excludedPaths = getData('excludedPaths')

  if (excludedPaths && excludedPaths.length > 0 && excludedPaths.indexOf(path) > -1) return false
  if (allowedPaths && allowedPaths.toString() === '*') return true
  return allowedPaths ? allowedPaths.indexOf(path) > -1 : false
}

export function accessDenied(path) {
  return !showPage(path)
}

export function isAuthorised(path) {
  return (typeof(path) === 'boolean' && path) || showPage(path)
}

/* TOKEN */

let verifyTokenTO = 0;

export function verifyToken() {
  if (!decodedToken()) return window.location.reload()

  clearTimeout(verifyTokenTO)

  verifyTokenTO = setTimeout(function() {
    Axios
      .get(process.env.REACT_APP_API_VERIFY_TOKEN_URL)
      .catch(error => {
        deleteTokens()
        window.location.reload()
      })
  }, 1000);
}

export function dataToken() {
  return Store.get('data')
}

export function token() {
  return Store.get('token')
}

export function deleteTokens() {
  Store.remove('data')
  Store.remove('token')
  Store.remove('tkid')
}

export function decodedToken() {
  if (dataToken()) {
    return JWT.verify(
      dataToken(),
      hash(Store.get('tkid'))[0],
      function(errors, decoded) {
        if (errors) {
          deleteTokens()
          return false
        }

        return decoded
      }
    )
  }
}

export function getData(data) {
  return decodedToken() && decodedToken()[data] ? decodedToken()[data] : null
}
