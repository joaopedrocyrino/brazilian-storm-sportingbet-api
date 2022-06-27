export default class BaseError extends Error {
    constructor (public readonly statusCode: number, message: string) {
      super(message)
    }
  }