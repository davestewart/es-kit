// ---------------------------------------------------------------------------------------------------------------------
// imports
// ---------------------------------------------------------------------------------------------------------------------

import {
  // term
  ExistsQuery,
  IdsQuery,
  TermQuery,
  TermsQuery,
  PrefixQuery,
  FuzzyQuery,
  FuzzyOptions,
  WildcardQuery,
  WildcardOptions,
  RegexpQuery,
  RegexpQueryOptions,
  RangeQuery,
  RangeQueryOptions,

  // text
  MatchAllQuery,
  MatchQuery,
  MatchPhraseQuery,
  MatchPhrasePrefixQuery,
  MultiMatchQuery,

  // compound
  BooleanQuery,
  Query,
} from '../types/queries'

// ---------------------------------------------------------------------------------------------------------------------
// term queries
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Returns documents that contain an indexed value for a field.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-exists-query.html
 */
export function _exists (field: string): ExistsQuery {
  return { exists: { field } }
}

/**
 * Returns documents based on their IDs. This query uses document IDs stored in the _id field.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-ids-query.html
 */
export function _ids (ids: string | string[]): IdsQuery {
  return { ids: { values: ids } }
}

/**
 * Returns documents that contain one or more exact terms in a provided field.
 *
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-term-query.html
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-terms-query.html
 */
export function _term (field: string, value: any): TermQuery | TermsQuery {
  return Array.isArray(value)
    ? { terms: { [field]: value } } as TermsQuery
    : { term: { [field]: { value } } } as TermQuery
}

/**
 * Returns documents that contain a specific prefix in a provided field.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-prefix-query.html
 */
export function _prefix (field: string, value: any): PrefixQuery {
  return { prefix: { [field]: { value } } }
}

/**
 * Returns documents that contain terms similar to the search term.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-fuzzy-query.html
 */
export function _fuzzy (field: string, value: string, options: FuzzyOptions = {}): FuzzyQuery {
  return { fuzzy: { [field]: { value, ...options } } }
}

/**
 * Returns documents that contain terms matching a wildcard pattern.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-wildcard-query.html
 */
export function _wildcard (field: string, value: string, options: WildcardOptions = {}): WildcardQuery {
  return { wildcard: { [field]: { value, ...options } } }
}

/**
 * Returns documents that contain terms matching a regular expression.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-regexp-query.html
 */
export function _regexp (field: string, value: string, options: RegexpQueryOptions = {}): RegexpQuery {
  return { regexp: { [field]: { value, ...options } } }
}

/**
 * Returns documents that contain terms within a provided range.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-range-query.html
 */
export function _range (field: string, options: RangeQueryOptions = {}): RangeQuery {
  return { range: { [field]: options } }
}

// ---------------------------------------------------------------------------------------------------------------------
// text queries
// ---------------------------------------------------------------------------------------------------------------------

/**
 * The most simple query, which matches all documents.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-match-all-query.html
 */
export function _matchAll (): MatchAllQuery {
  return { match_all: {} }
}

/**
 * Returns documents that match a provided text, number, date or boolean value.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-match-query.html
 */
export function _match (field: string, value: any): MatchQuery {
  return { match: { [field]: value } }
}

/**
 * The match_phrase query analyzes the text and creates a phrase query out of the analyzed text.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-match-query-phrase.html
 */
export function _matchPhrase (field: string, value: any): MatchPhraseQuery {
  return { match_phrase: { [field]: value } }
}

/**
 * Returns documents that contain the words of a provided text, in the same order as provided.
 * The last term of the provided text is treated as a prefix, matching any words that begin with that term.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-match-query-phrase-prefix.html
 */
export function _matchPhrasePrefix (field: string, value: any): MatchPhrasePrefixQuery {
  return { match_phrase_prefix: { [field]: value } }
}

/**
 * The multi_match query builds on the match query to allow multi-field queries.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-multi-match-query.html
 */
export function _multiMatch (fields: string | string[], value: any, type = 'phrase_prefix'): MultiMatchQuery {
  return {
    multi_match: {
      fields: Array.isArray(fields) ? fields : [fields],
      query: value,
      type,
    },
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// compound queries
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A query that matches documents matching boolean combinations of other queries.
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/query-dsl-bool-query.html
 */
export function _bool (type: 'must' | 'filter' | 'should' | 'must_not', clauses: Query[]): BooleanQuery | Query {
  if (clauses.length === 1) {
    return clauses[0] as Query
  }
  return {
    bool: {
      [type]: clauses,
    },
  } as BooleanQuery
}

/**
 * The clause (query) must appear in matching documents (AND)
 * @param clauses
 */
export function _must (clauses: Query[]) {
  return _bool('must', clauses)
}

/**
 * The clause (query) should appear in the matching document (OR)
 * @param clauses
 */
export function _should (clauses: Query[]) {
  return _bool('should', clauses)
}

/**
 * The clause (query) must appear in matching documents (AND)
 * The score of the query is ignored.
 * @param clauses
 */
export function _filter (clauses: Query[]) {
  return _bool('filter', clauses)
}

/**
 * The clause (query) must not appear in the matching documents
 * The score of the query is ignored.
 * @param clauses
 */
export function _mustNot (clauses: Query[]) {
  return _bool('must_not', clauses)
}

// ---------------------------------------------------------------------------------------------------------------------
// queries object (import as $)
// ---------------------------------------------------------------------------------------------------------------------

export default {
  // term
  ids: _ids,
  term: _term,
  prefix: _prefix,
  fuzzy: _fuzzy,
  wildcard: _wildcard,
  regexp: _regexp,
  range: _range,
  exists: _exists,

  // text
  matchAll: _matchAll,
  match: _match,
  matchPhrase: _matchPhrase,
  matchPhrasePrefix: _matchPhrasePrefix,
  multiMatch: _multiMatch,

  // compound
  bool: _bool,
  must: _must,
  should: _should,
  filter: _filter,
  mustNot: _mustNot,

  // synonyms
  all: _matchAll,
  and: _must,
  or: _should,
}
