import { oakCors } from 'https://deno.land/x/cors/mod.ts'
import { db } from './config/db.ts'
import { Application, applyGraphQL, Router } from './config/deps.ts'
import { ZahlungserfassungResolvers } from './resolver/zahlungserfassungResolver.ts'
import { Schema } from './schema/index.ts'

const author = db.getDatabase().collection('author')
const post = db.getDatabase().collection('post')

/**
 * Oaks graphql middleware basically
 */
export class App {
  public app: Application
  public port: number
  public logger: any

  constructor(port: number) {
    this.app = new Application()
    this.port = port
    this.initializeMiddleware()
    this.initializeRoutes()
  }

  private async initializeRoutes() {
    const graphQLService = await applyGraphQL<Router>({
      Router,
      path: '/graphql',
      typeDefs: Schema,
      resolvers: ZahlungserfassungResolvers,
      context: (ctx) => {},
    })

    console.log('graphql routes initialized...')
    this.app.use(graphQLService.routes(), graphQLService.allowedMethods())
  }

  private initializeMiddleware() {
    this.app.use(
      oakCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    )
    this.app.use(async (ctx: any, next: any) => {
      await next()
      const rt = ctx.response.headers.get('X-Response-Time')
      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
    })
  }

  public async listen() {
    return await this.app.listen({
      port: this.port,
    })
  }
}
