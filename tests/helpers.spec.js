const { Scripts, Helpers } = require('../dist')
const res = require('./fixtures/search.res.json')
const req = require('./fixtures/search.req.json')

function test (ctx, params) {
  const target = ctx._source[params.name]
  for (let i = 0; i < 1000; i++) {
    if (target.value === 123) {
      target.value = i * 1000
    }
  }
}

describe('scripts', function () {
  it('should convert inline functions', function () {
    const received = Helpers.painless(test)
    const expected = 'def target = ctx._source[params.name]; for (int i = 0; i < 1000; i++) { if (target.value == 123) { target.value = i * 1000; } }'
    expect(received).toEqual(expected)
  })

  it('should convert package functions', function () {
    const received = Scripts.removeFromArray('list', 123)
    const expected = {
      lang: 'painless',
      source: 'def target = ctx._source[params.name]; for (int i = target.length - 1; i >= 0; i--) { if (target[i] == params.value) { target.remove(i); } }',
      params: {
        name: 'list',
        value: 123
      },
    }
    expect(received).toEqual(expected)
  })

  it('should handle single-line string scripts', function () {
    const source = 'ctx._source.test = 1'
    const received = Helpers.script(source)
    const expected = {
      lang: 'painless',
      source
    }
    expect(received).toEqual(expected)
  })

  it('should handle multi-line string scripts', function () {
    const source = `
    if (ctx._source.test === 1) {
      ctx._source.test = 2
    }`
    const received = Helpers.script(source)
    const expected = {
      lang: 'painless',
      source: 'if (ctx._source.test == 1) { ctx._source.test = 2; }',
    }
    expect(received).toEqual(expected)
  })
})

describe('sort', function () {
  it('should handle strings', function () {
    const received = Helpers.sort('name')
    const expected = { 'name.keyword': 'asc' }
    expect(received).toEqual(expected)
  })

  it('should handle arrays', function () {
    const received = Helpers.sort(['name', 'age'])
    const expected = { 'name.keyword': 'asc', 'age.keyword': 'asc' }
    expect(received).toEqual(expected)
  })

  it('should handle objects', function () {
    const received = Helpers.sort({ name: true, age: false })
    const expected = { 'name.keyword': 'asc', 'age.keyword': 'desc' }
    expect(received).toEqual(expected)
  })
})

describe('search', function () {
  const hits = [
    {
      _id: 'ZRWBNH0Bk8QNffIJQWQp',
      name: 'Contact 1',
      phone: '020 0000 0000'
    },
    {
      _id: 'lCloSH0Bs3kx_70FRmtW',
      name: 'Contact 2',
      phone: '020 1111 1111'
    }
  ]

  it('should simplify results', function () {
    const res = require('./fixtures/search.res.json')
    const received = Helpers.extractSearch(res, {})
    expect(received).toEqual(hits)
  })

  it('should paginate results', function () {
    const req = require('./fixtures/search.req.json')
    const res = require('./fixtures/search.res.json')
    const received = Helpers.paginate(res, req)
    const expected = {
      meta: {
        from: 2,
        size: 2,
        total: 4
      },
      hits
    }
    expect(received).toEqual(expected)
  })
})
