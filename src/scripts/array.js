export function addTo (ctx, params) {
  ctx._source[params.name].add(params.value)
}

export function removeFrom (ctx, params) {
  const target = ctx._source[params.name]
  for (let i = target.length - 1; i >= 0; i--) {
    if (target[i] === params.value) {
      target.remove(i)
    }
  }
}
