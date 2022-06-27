import Joi from 'joi'

import { JWT, Uuid } from '../frameworks'
import { AuthorizationError, BadRequestError } from '../errors'

class Services {
  protected createBase (): {
    id: string
  } {
    return {
      id: Uuid.generate(),
    }
  };

  protected async check ({ token, schema, req, scope }: {
    token?: string
    schema?: Joi.ObjectSchema<any>
    scope?: boolean
    req: any
  }): Promise<void> {

    await this.checkScope(scope, token)

    this.checkRequest(req, schema)
  }

  private readonly checkScope = async (scope?: boolean, token?: string): Promise<void> => {
    if (scope) {
        const error = await JWT.decode(token)
        if (error) { throw new AuthorizationError() }
    }
  }

  private readonly checkRequest = (
    request: any,
    schema?: Joi.ObjectSchema<any>
  ): void => {
    if (schema) {
      const { error } = schema.validate(request)
      if (error) {
        console.log(error)
        throw new BadRequestError()
      }
    }
  }
};

export default Services
