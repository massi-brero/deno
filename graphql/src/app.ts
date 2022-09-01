import { Application, applyGraphQL } from './config/deps.ts';
import { resolvers } from './resolver/index.ts';
import { Schema } from './schema/index.ts';


@export class App {
  public app: Application
  public port: number
  public logger: any

  constructor(port: number) {
    this.initializeMiddleware()
    this.initializeRoutes()
  }

  initializeRoutes() {
    const graphQLService = await applyGraphQL({
      path: '/graphql',
      typeDefs: Schema,
      resolvers: resolvers,
      context: ctx => {}
    })

    this.app.use(graphQLService.routes, graphQLService.allowedMethods())
  }

  initializeMiddleware() {
    this.app.use(async (ctx: any, next: any) => {
      await next()
      const rt = ctx.response.headers.get('X-Response-Time')
      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
    })
  }

  public  async listen() {
    return await this.app.listen({
      port: this.port
    })
  }
}
