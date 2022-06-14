import { IGateway } from './gateway'

export interface IRoute {
  route: string
  handler: IGateway
  method: 'POST' | 'PATCH' | 'GET' | 'DELETE'
}