/* eslint-disable camelcase,no-use-before-define */

// ---------------------------------------------------------------------------------------------------------------------
// base
// ---------------------------------------------------------------------------------------------------------------------

export interface QueryOptions {
  boost?: number
}

// ---------------------------------------------------------------------------------------------------------------------
// exists
// ---------------------------------------------------------------------------------------------------------------------

export interface ExistsQuery {
  exists: {
    field: string
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// ids
// ---------------------------------------------------------------------------------------------------------------------

export interface IdsQuery {
  ids: {
    values: string | string[]
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// term(s)
// ---------------------------------------------------------------------------------------------------------------------

export interface TermQuery {
  term: {
    [x: string]: {
      value: string
    }
  }
}

export interface TermsQuery {
  terms: {
    [x: string]: string[]
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// prefix
// ---------------------------------------------------------------------------------------------------------------------

export interface PrefixQuery {
  prefix: {
    [x: string]: {
      value: any
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// fuzzy
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-fuzzy-query.html#fuzzy-query-top-level-params
 */
export interface FuzzyOptions extends QueryOptions {
  fuzziness?: string,
  max_expansions?: number,
  prefix_length?: number,
  transpositions?: boolean,
  rewrite?: RewriteValues
}

export type FuzzyQuery = {
  fuzzy: {
    [x: string]: {
      value: string
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// wildcard
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-wildcard-query.html#wildcard-query-field-params
 */
export interface WildcardOptions extends QueryOptions {
  case_insensitive?: boolean
  rewrite?: RewriteValues
}

export type WildcardQuery = {
  wildcard: {
    [x: string]: {
      value: string
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// regexp
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-multi-term-rewrite.html
 */
export interface RegexpQueryOptions extends QueryOptions {
  flags?: number
  case_insensitive?: boolean
  max_determinized_states?: number
  rewrite?: RewriteValues
}

type RewriteValues = 'constant_score'
  | 'constant_score_boolean'
  | 'scoring_boolean'
  | 'top_terms_blended_freqs_N'
  | 'top_terms_boost_N'
  | 'top_terms_N'

export interface RegexpQuery {
  regexp: {
    [x: string]: { value: string } & RegexpQueryOptions,
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// range
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-range-query.html#range-query-field-params
 */
export interface RangeQueryOptions extends QueryOptions {
  gt?: number
  lt?: number
  gte?: number
  lte?: number
  format?: string
  relation?: 'INTERSECTS' | 'CONTAINS' | 'WITHIN'
  time_zone?: string
}

export interface RangeQuery {
  range: {
    [x: string]: RangeQueryOptions,
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// match
// ---------------------------------------------------------------------------------------------------------------------

export interface MatchAllQuery {
  match_all: {}
}

export interface MatchQuery {
  match: {
    [x: string]: any
  }
}

export interface MatchPhraseQuery {
  match_phrase: {
    [x: string]: any
  }
}

export interface MatchPhrasePrefixQuery {
  match_phrase_prefix: {
    [x: string]: any
  }
}

export interface MultiMatchQuery {
  multi_match: {
    type: string,
    fields: string[],
    query: any
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// compound
// ---------------------------------------------------------------------------------------------------------------------

export type BooleanQuery = MustQuery | ShouldQuery | MustNotQuery | FilterQuery

export type MustQuery = {
  bool: {
    must: Query[]
  }
}

export type ShouldQuery = {
  bool: {
    should: Query[]
  }
}

export type FilterQuery = {
  bool: {
    filter: Query[]
  }
}

export type MustNotQuery = {
  bool: {
    must_not: Query[]
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Query (should contain all other query types)
// ---------------------------------------------------------------------------------------------------------------------

export type Query = BooleanQuery
  | ExistsQuery
  | IdsQuery
  | TermQuery
  | TermsQuery
  | PrefixQuery
  | FuzzyQuery
  | WildcardQuery
  | RegexpQuery
  | RangeQuery
  | MatchQuery
  | MatchPhraseQuery
  | MatchPhrasePrefixQuery
  | MultiMatchQuery
  | MatchAllQuery
