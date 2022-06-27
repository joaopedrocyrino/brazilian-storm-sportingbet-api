import BaseError from './base'

export default class AuthorizationError extends BaseError {
  constructor (message?: string) {
    super(403, message ?? 'AuthorizationError')
  }
}