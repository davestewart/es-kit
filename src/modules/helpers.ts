/* eslint-disable no-redeclare */
// @ts-ignore
import semi from 'semi'
import { BooleanQuery, Query } from '../types/queries'
import { SearchOptions, SortOptions } from '../types/client'
import { ElasticError } from '../classes'
import { config } from '../config'
import _ from './queries'

// ---------------------------------------------------------------------------------------------------------------------
// debugging
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Helper to log data
 */
export function $log (label: string, data: any = null) {
  if (config.debug) {
    console.log(label + ': ' + JSON.stringify(data, null, '  ')) // ?
  }
}

/**
 * Helper to generate (and optionally log) an error
 */
export function $error (info: any) {
  const error = new ElasticError(info)
  $log('error', error)
  return error
}

// ---------------------------------------------------------------------------------------------------------------------
// make options
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Build sort options from string, array or object
 *
 * @param field
 * @param keyword
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.15/sort-search-results.html
 */
export function $sort (field: string, keyword?: boolean): SortOptions
export function $sort (fields: string[], keyword?: boolean): SortOptions
export function $sort (fields: Record<string, string | number | boolean>, keyword?: boolean): SortOptions
export function $sort (value: any, keyword = true): SortOptions {
  // helper
  const makeKey = (value: string) => keyword ? `${value}.keyword` : value
  const ASC = 'asc'
  const DESC = 'desc'

  // string: sort by that key, ascending
  if (typeof value === 'string') {
    return { [makeKey(value)]: ASC }
  }

  // array: sort by those keys, ascending
  if (Array.isArray(value)) {
    return (value as string[]).reduce((output, value) => {
      output[makeKey(value)] = ASC
      return output
    }, {} as any)
  }

  // object: sort by key => values, depending on value
  return Object.keys(value).reduce((output, key) => {
    const v = value[key]
    output[makeKey(key)] = typeof v === 'string'
      ? v.toLowerCase()
      : typeof v === 'number'
        ? v < 0 ? DESC : ASC
        : v ? ASC : DESC
    return output
  }, {} as any)
}

/**
 * Helper to build a Painless script from a JavaScript function
 */
export function $painless (source: Function | string): string {
  // convert functions
  if (typeof source === 'function') {
    // remove function wrapper
    source = String(source)
      .replace(/^function\s+.+?{|}$/g, '')
      .trim()
  }

  // add semicolons
  if (source.includes('\n')) {
    source = String(semi.add(source)).trim()
  }

  // convert to painless
  source = source
    // convert declarations
    .replace(/\b(var|let|const)\b/g, 'def')

    // optimise declarations
    .replace(/for\s*\(\s*def/g, 'for (int')

    // remove strict equality
    .replace(/([!=]=)(=)/g, '$1')

  // compact whitespace
  if (source.includes('\n')) {
    source = source
      .replace(/([;{}])[\n\r]\s*/g, '$1 ')
      .trim()
  }

  // return
  return source
}

/**
 * Helper to build a Painless script from a JavaScript function
 */
export function $script (source: Function | string, params?: Record<string, any>) {
  return {
    lang: 'painless',
    source: $painless(source),
    ...params ? { params } : {},
  }
}

/**
 * Build a query based on a hash of values
 */
export function $query (fields: Record<string, any>, options: { type?: 'and' | 'or', exact?: boolean } = {}): BooleanQuery | Query {
  // ensure all keys have values
  const keys = Object.keys(fields).filter(key => fields[key] !== '')

  // if no keys have values, return a match all
  if (keys.length === 0) {
    return _.all()
  }

  // functions
  const bool = options.type === 'and'
    ? _.must
    : _.should
  const match = options.exact
    ? _.term
    : _.matchPhrasePrefix

  // otherwise, build clauses
  const clauses = keys
    .map((key) => {
      const value = fields[key]

      // value is array
      if (Array.isArray(value)) {
        return bool(value.map(value => match(key, value)))
      }

      // wildcard key
      if (key === '_all' || key === '*') {
        return _.multiMatch(['*'], value) // used to be matchAny
      }

      // normal match
      return value.includes('*')
        ? _.wildcard(key, value.trim().replace(/ +/g, '*'))
        : match(key, value)
    })

  // return query
  return clauses.length > 1
    ? bool(clauses)
    : clauses[0]
}

/**
 * Helper to build bulk queries
 */
export function $bulk (index: string, queries: Query[], options: SearchOptions = {}) {
  return queries.flatMap(query => [
    { index },
    { query, ...options },
  ])
}

/**
 * Helper to build search options
 */
export function $options (options: SearchOptions) {
  const defaults = {
    size: 50,
  }
  return { ...defaults, ...options }
}

// ---------------------------------------------------------------------------------------------------------------------
// response
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Helper to remap a document's fields
 */
export function $fields (doc: Record<string, any>, fields: Record<string, string> | Function) {
  if (typeof fields === 'function') {
    try {
      return fields(doc)
    }
    catch (err: any) {
      return err.message
    }
  }
  return Object.keys(fields).reduce((output, to) => {
    const from = fields[to]
    output[to] = doc[from]
    return output
  }, {} as any)
}

/**
 * Helper to paginate search results, returning `meta` and `hits` components
 */
export function $paginate (res: any, options: SearchOptions) {
  const hits = $extractSearch(res, options)
  const meta = res.body.hits
  return {
    meta: {
      total: meta.total.value,
      size: options.size || 10,
      from: options.from || 0,
    },
    hits,
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// extract results
// ---------------------------------------------------------------------------------------------------------------------

export function $extract (res: any, req: any) {
  const { body } = res

  // create
  if (body.result === 'created') {

  }

  // update
  if (body.result === 'updated') {
    return {
      _id: body._id,
      ...req.body
    }
  }

  // search
  if (body.hits) {

  }

  return {

  }
}

/**
 * Helper to extract search results
 */
export function $extractSearch (res: any, options: SearchOptions) {
  return (res.body || res).hits.hits.map((hit: any) => {
    const doc = { _id: hit._id, ...hit._source }
    return options._fields
      ? $fields(doc, options._fields)
      : doc
  })
}

export function $extractCreate (res: any, body: any = {}) {
  const _id = res.body._id
  return {
    _id,
    ...body
  }
}

export function $extractUpdate (res: any, doc = {}) {
  const _id = res.body._id
  const result = res.body.result
  if (result === 'updated') {
    return {
      _id,
      ...doc
    }
  }
  return {}
}

export function $extractDelete (res: any) {
  const _id = res.body._id
  const result = res.body.result
  if (result === 'deleted') {
    return {
      _id,
    }
  }
  return {}
}

export default {
  // debugging
  log: $log,
  error: $error,

  // request
  sort: $sort,
  painless: $painless,
  script: $script,
  query: $query,
  bulk: $bulk,
  options: $options,

  // response
  fields: $fields,
  paginate: $paginate,

  // results
  extractSearch: $extractSearch,
  extractCreate: $extractCreate,
  extractUpdate: $extractUpdate,
  extractDelete: $extractDelete,
}
