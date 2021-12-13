const { Scripts, Helpers } = require('../dist')

// ---------------------------------------------------------------------------------------------------------------------
// script
// ---------------------------------------------------------------------------------------------------------------------

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
        value: 123,
      },
    }
    expect(received).toEqual(expected)
  })

  it('should handle single-line string scripts', function () {
    const source = 'ctx._source.test = 1'
    const received = Helpers.script(source)
    const expected = {
      lang: 'painless',
      source,
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

// ---------------------------------------------------------------------------------------------------------------------
// sort
// ---------------------------------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------------------------------
// query
// ---------------------------------------------------------------------------------------------------------------------

describe('query', function () {
  const params = {
    name: 'dave',
    age: 5,
  }

  const matches = [
    { match_phrase_prefix: { name: 'dave' } },
    { match_phrase_prefix: { age: 5 } },
  ]

  const terms = [
    { term: { name: { value: 'dave' } } },
    { term: { age: { value: 5 } } },
  ]

  it('should default to a "must/match" query', function () {
    const received = Helpers.query(params)
    const expected = {
      bool: {
        must: matches,
      },
    }
    expect(received).toEqual(expected)
  })

  it('should create a "must/match" query', function () {
    const received = Helpers.query(params, { type: 'and', exact: false })
    const expected = {
      bool: {
        must: matches,
      },
    }
    expect(received).toEqual(expected)
  })

  it('should create a "should/match" query', function () {
    const received = Helpers.query(params, { type: 'or', exact: false })
    const expected = {
      bool: {
        should: matches,
      },
    }
    expect(received).toEqual(expected)
  })

  it('should create a "must/term" query', function () {
    const received = Helpers.query(params, { type: 'and', exact: true })
    const expected = {
      bool: {
        must: terms,
      },
    }
    expect(received).toEqual(expected)
  })

  it('should create a "should/term" query', function () {
    const received = Helpers.query(params, { type: 'or', exact: true })
    const expected = {
      bool: {
        should: terms,
      },
    }
    expect(received).toEqual(expected)
  })

  it('should handle array fields', function () {
    const params = {
      name: ['dave', 'john'],
    }
    const received = Helpers.query(params, { type: 'and', exact: true })
    const expected = {
      bool: {
        must: [
          { term: { name: { value: 'dave' } } },
          { term: { name: { value: 'john' } } },
        ],
      },
    }
    expect(received).toEqual(expected)
  })

  it('should handle wildcard fields', function () {
    const params = {
      '*': 'foo',
    }
    const received = Helpers.query(params, { type: 'or', exact: true })
    const expected = {
      multi_match: {
        fields: ['*'],
        query: 'foo',
        type: 'phrase_prefix',
      },
    }
    expect(received).toEqual(expected)
  })

  it('should handle wildcard values', function () {
    const params = {
      name: '*',
    }
    const received = Helpers.query(params, { type: 'or', exact: true })
    const expected = {
      wildcard: {
        name: { value: '*' },
      },
    }
    expect(received).toEqual(expected)
  })
})

// ---------------------------------------------------------------------------------------------------------------------
// extract
// ---------------------------------------------------------------------------------------------------------------------

describe('extract', function () {
  const hits = [
    {
      _id: 'ZRWBNH0Bk8QNffIJQWQp',
      name: 'Contact 1',
      phone: '020 0000 0000',
    },
    {
      _id: 'lCloSH0Bs3kx_70FRmtW',
      name: 'Contact 2',
      phone: '020 1111 1111',
    },
  ]

  it('should simplify results', function () {
    const res = require('./fixtures/search.res.json')
    const received = Helpers.extract.search(res, {})
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
        total: 4,
      },
      hits,
    }
    expect(received).toEqual(expected)
  })
})
