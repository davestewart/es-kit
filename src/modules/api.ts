import { SearchOptions } from '../types/client'
import { Query } from '../types/queries'
import { config } from '../config'
import $ from './helpers'

// ---------------------------------------------------------------------------------------------------------------------
// search
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Perform a search
 *
 * @param   index       The index to search on
 * @param   query       An Elastic query configuration
 * @param   options     An optional hash of SearchOptions
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.16/search-search.html
 * @see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_search
 */
export async function __search (index: string, query: Query, options: SearchOptions = {}) {
  // options
  options = $.options(options)

  // build parameters
  const { _fields, ...opts } = options
  const params = {
    index,
    body: {
      ...opts,
      query,
    },
  }

  // search
  try {
    $.log('params', params)
    const res = await config.client.search(params)
    return 'from' in options
      ? $.paginate(res, options)
      : $.extract.search(res, options)
  }
  catch (err) {
    throw $.error(err)
  }
}

/**
 * Perform a multi-search
 *
 * @param   index       The index to search on
 * @param   queries     An array of Elastic Query configurations (without index pre-queries!)
 * @param   options     An optional hash of SearchOptions
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.16/search-multi-search.html
 * @see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#_msearch
 */
export async function __multiSearch (index: string, queries: Query[], options: SearchOptions = {}) {
  // options
  options = $.options(options)

  // build parameters
  const { _fields, ...opts } = options
  const params = {
    body: $.bulk.search(index, queries, opts)
  }

  // search
  try {
    $.log('params', params)
    const res = await config.client.msearch(params) // ?
    if (res.responses) {
      return res.responses.map((res: any) => {
        return $.extract.search(res, options)
      })
    }
    return []
  }
  catch (err) {
    throw $.error(err)
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// index
// ---------------------------------------------------------------------------------------------------------------------

export async function __create (index: string, body: any, options: any = {}) {
  const params = {
    ...options,
    index,
    body
  }
  try {
    $.log('params', params)
    const res = await config.client.index(params)
    return $.extract.create(res, body)
  }
  catch (err) {
    throw $.error(err)
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// update
// ---------------------------------------------------------------------------------------------------------------------

export async function __update (index: string, id: string, body: { doc?: any, script?: string }, options: any = {}) {
  // variables
  const { doc, script } = body
  const { _id, ...source } = doc || {}

  // determine doc or script update
  body = doc
    ? { doc: source }
    : { script }

  // params
  const params = {
    ...options,
    index,
    body,
    id,
  }

  // call
  try {
    $.log('params', params)
    const res = await config.client.update(params)
    return $.extract.update(res, doc)
  }
  catch (err) {
    throw $.error(err)
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// delete
// ---------------------------------------------------------------------------------------------------------------------

export async function __delete (index: string, id: string, options: any = {}) {
  const params = {
    ...options,
    index,
    id,
  }
  try {
    const res = await config.client.delete(params)
    return $.extract.delete(res)
  }
  catch (err) {
    throw $.error(err)
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// export
// ---------------------------------------------------------------------------------------------------------------------

export default {
  // init
  init: config.init,

  // search
  search: __search,
  multiSearch: __multiSearch,

  // index
  create: __create,
  bulkCreate: true,

  // update
  update: __update,
  bulkUpdate: true,

  // delete
  delete: __delete,
  bulkDelete: true,
}
