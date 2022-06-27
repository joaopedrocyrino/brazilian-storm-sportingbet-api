import 'dotenv/config'
import express, { Express, json, urlencoded, Request, Response } from 'express'
import cors from 'cors'
import { IRoute } from '../dto'
import routes from '../routes'

class ExpressServer {
    private readonly app: Express
    private readonly port: number
    private readonly routes: IRoute[]

    constructor() {
        this.app = express()
        this.app.use(json())
        this.app.use(urlencoded({ extended: false }))
        this.app.use(cors())

        this.routes = routes
    }

    adaptRoutes(): void {
        this.routes.forEach((route) => {
            const method = route.method.toLowerCase()

            this.app[method](route.route, async (req: Request, res: Response) => {
                const requestQuery = req.query || {}

                // const query: { [key: string]: any } = {}

                // Object.keys(requestQuery).forEach((k: string) => {
                //     // @ts-expect-error
                //     query[k] = JSON.parse(requestQuery[k])
                // })

                const request = {
                    // ...(req.body || {}),
                    ...requestQuery,
                    // ...(req.params || {}),
                    token: req.header('auth')
                }

                const { body, error, statusCode } = await route.handler.gateway(request)

                const response: { error?: string, body?: any } = {}

                if (error) { response.error = error } else { response.body = body }

                console.log(route.method, req.path, statusCode, '\nquery:', requestQuery, '\nparams', req.params)

                res.status(statusCode).json(response)
            })
        })
        console.log('Express routes registered successfully')
    }

    init(): void {
        this.adaptRoutes()
        this.app.listen(process.env.PORT, () => { console.log(`🚀  Server ready at ${process.env.PORT}`) })
    }
}

export default new ExpressServer()