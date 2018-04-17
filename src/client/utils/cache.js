export function createKey(key, params) {
  if (!params) {
    return key
  }

  return key + JSON.stringify(params)
}

export function set(key, value) {
  if (!key || !value) {
    return null
  }

  if (typeof value === "object") {
    value = JSON.stringify(value)
  }

  sessionStorage.setItem(key, value)
}

export function get(key) {
  var value = sessionStorage.getItem(key)

  if (!value) {
    return null
  }

  // assume it is an object that has been stringified
  if (value[0] === "{") {
    value = JSON.parse(value)
  }

  return value
}
