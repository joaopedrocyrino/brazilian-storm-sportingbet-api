export interface IGateway {
  gateway: (request: any) => Promise<any>
}