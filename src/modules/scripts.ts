import { $script } from './helpers'

// @ts-ignore
import * as array from '../scripts/array.js'

export function addToArray (name: string, value: any) {
  return $script(array.addTo, { name, value })
}

export function removeFromArray (name: string, value: any) {
  return $script(array.removeFrom, { name, value })
}

export default {
  addToArray,
  removeFromArray,
}
