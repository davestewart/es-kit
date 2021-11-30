/* eslint-disable no-use-before-define */
export type SortOptions = Record<string, 'asc' | 'desc'>

export type SortOption = Record<string, string | SortOptionOptions>

export type SortOptionOptions = {
  order?: string
  format?: string
}
export type SearchOptions = {
  // request
  size?: number,
  from?: number,
  sort?: SortOption | SortOption[]
  q?: string,

  // response
  _source?: string[],
  keys?: Record<string, string> | Function,

  // other
  [x: string]: any,
}
