/**
 * Error class to simply communicate errors
 */
export class ElasticError extends Error {
  message = 'Unknown error'

  type = 'unknown'

  status = 400

  constructor (info: any) {
    // super
    super()

    // console.log('info:', JSON.stringify(info, null, '  '))

    // response error
    if (info.meta) {
      // constants
      const meta = info.meta
      const { error, status } = meta.body

      // error has meaningful info
      if (error) {
        const { reason, type } = error
        this.message = reason
        this.type = type
        this.status = status
      }

      // no error, likely 404
      else if (meta.statusCode === 404) {
        this.message = 'Resource not found'
        this.type = 'response_error'
        this.status = 404
      }
    }

    // configuration error
    else {
      this.message = info.message
      this.type = info.name || info.type
    }
  }

  toJSON () {
    return {
      message: 'ElasticError: ' + this.message,
      status: this.status,
      type: this.type,
    }
  }
}
