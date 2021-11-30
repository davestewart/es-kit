const { Queries: _ } = require('../dist')

describe('term', function () {
  describe('ids', function () {
    it('ids: single', function () {
      const received = _.ids('1')
      const expected = { ids: { values: '1' } }
      expect(received).toEqual(expected)
    })

    it('ids: array', function () {
      const received = _.ids(['1'])
      const expected = {
        ids: {
          values: ['1'],
        },
      }
      expect(received).toEqual(expected)
    })
  })

  it('term', function () {
    const received = _.term('this', 'that')
    const expected = {
      term: {
        this: {
          value: 'that',
        },
      },
    }
    expect(received).toEqual(expected)
  })

  it('prefix', function () {
    const received = _.prefix('this', 'that')
    const expected = {
      prefix: {
        this: {
          value: 'that'
        }
      }
    }
    expect(received).toEqual(expected)
  })

  it('fuzzy', function () {
    const received = _.fuzzy('this', 'that')
    const expected = {
      fuzzy: {
        this: {
          value: 'that'
        }
      }
    }
    expect(received).toEqual(expected)
  })

  it('wildcard', function () {
    const received = _.wildcard('this', 'th*t')
    const expected = {
      wildcard: {
        this: {
          value: 'th*t'
        }
      }
    }
    expect(received).toEqual(expected)
  })

  it('regexp', function () {
    const received = _.regexp('this', 'that')
    const expected = {
      regexp: {
        this: {
          value: 'that'
        }
      }
    }
    expect(received).toEqual(expected)
  })

  it('range', function () {
    const received = _.range('this', { gt: 5, lt: 10 })
    const expected = {
      range: {
        this: {
          gt: 5,
          lt: 10,
        }
      }
    }
    expect(received).toEqual(expected)
  })

  it('exists', function () {
    const received = _.exists('this')
    const expected = {
      exists: {
        field: 'this'
      }
    }
    expect(received).toEqual(expected)
  })
})

describe('text', function () {
  it('matchAll', function () {
    const received = _.matchAll()
    const expected = {
      match_all: {}
    }
    expect(received).toEqual(expected)
  })

  it('match', function () {
    const received = _.match('this', 'that')
    const expected = {
      match: {
        this: 'that'
      }
    }
    expect(received).toEqual(expected)
  })

  it('matchPhrase', function () {
    const received = _.matchPhrase('this', 'that')
    const expected = {
      match_phrase: {
        this: 'that'
      }
    }
    expect(received).toEqual(expected)
  })

  it('matchPhrasePrefix', function () {
    const received = _.matchPhrasePrefix('this', 'that')
    const expected = {
      match_phrase_prefix: {
        this: 'that'
      }
    }
    expect(received).toEqual(expected)
  })

  it('multiMatch', function () {
    const received = _.multiMatch(['foo', 'bar'], 'that')
    const expected = {
      multi_match: {
        fields: ['foo', 'bar'],
        query: 'that',
        type: 'phrase_prefix',
      }
    }
    expect(received).toEqual(expected)
  })
})

describe('bool', function () {
  // clauses
  const match1 = _.match('foo', 'bar')
  const match2 = _.prefix('foo', 'bar')
  const query1 = { match: { foo: 'bar' } }
  const query2 = { prefix: { foo: { value: 'bar' } } }
  const matches = [match1, match2]
  const queries = [query1, query2]

  // queries
  it('bool', function () {
    const received = _.bool('must', matches)
    const expected = {
      bool: {
        must: queries
      }
    }
    expect(received).toEqual(expected)
  })

  describe('substitutes', function () {
    it('must', function () {
      const received = _.must(matches)
      const expected = {
        bool: {
          must: queries
        }
      }
      expect(received).toEqual(expected)
    })

    it('should', function () {
      const received = _.should(matches)
      expect(received.bool.should).toBeDefined()
    })

    it('filter', function () {
      const received = _.filter(matches)
      expect(received.bool.filter).toBeDefined()
    })

    it('mustNot', function () {
      const received = _.mustNot(matches)
      expect(received.bool.must_not).toBeDefined()
    })
  })

  describe('synonyms', function () {
    it('all', function () {
      const received = _.all()
      const expected = _.matchAll()
      expect(received).toEqual(expected)
    })

    it('and', function () {
      const received = _.and(matches)
      const expected = _.bool('must', matches)
      expect(received).toEqual(expected)
    })

    it('or', function () {
      const received = _.or(matches)
      const expected = _.bool('should', matches)
      expect(received).toEqual(expected)
    })
  })
})
