import BaseError from './base'

export default class BadRequestError extends BaseError {
  constructor () {
    super(400, 'Bad request error!')
  }
}