import { Client } from 'elasticsearch'

export class Config {
  client: Client

  debug = false

  constructor () {
    this.init = this.init.bind(this)
    this.client = <Client> new Proxy({}, {
      get () {
        throw new Error('Initialise the Api before calling methods on it')
      }
    })
  }

  init (client: Client, options: any = {}) {
    this.client = client
    this.debug = options.debug || false
  }
}
