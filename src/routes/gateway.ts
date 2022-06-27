import { IGateway } from '../dto'
import { BaseError } from '../errors'

export default class Gateway implements IGateway {
    readonly service?: (obj: { [k: string]: any }) => Promise<any>

    constructor({
        service
    }: Omit<Gateway, 'gateway' | 'checkRequest'>) {
        this.service = service
    }

    async gateway(req: {
        token?: string
        [key: string]: any
    }): Promise<any> {
        try {
            return await this.service(req)
        } catch (error) {
            console.log(error);
            
            return error instanceof BaseError
                ? {
                    statusCode: error.statusCode,
                    error: error.message
                }
                : {
                    statusCode: 500,
                    error: 'Server error'
                }
        }
    }
}