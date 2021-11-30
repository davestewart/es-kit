const ctx = {
  _source: {}
}

export function addField (name, value) {
  ctx._source[name] = value
}

export function removeField (name) {
  ctx._source.remove(name)
}
