export function createKey(key, params) {
  if (!params) {
    return key
  }

  return key + JSON.stringify(params)
}

export function set(key, value) {
  if (!key || !value) {
    throw Error('inalid key or empty value to set')
  }

  sessionStorage.setItem(
    key,
    typeof value === 'object' ? JSON.stringify(value) : value
  )

  return null
}

export function get(key) {
  let value = sessionStorage.getItem(key)

  if (!value) {
    return null
  }

  // assume it is an object that has been stringified
  if (value[0] === '{') {
    value = JSON.parse(value)
  }

  return value
}
