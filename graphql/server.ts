import 'https://deno.land/x/dotenv/load.ts'

import { App } from './src/app.ts'
//import { DbConnection } from './src/config/db.ts'

const PORT = parseInt(Deno.env.get('PORT') || '8888') || 8888
const app = new App(PORT)

// const dbUrl = 'mongodb://127.0.0.1:27017/'
// const dbName = Deno.env.get('DB_NAME') || 'deno-graphql'
// const dbHostUrl = Deno.env.get('DB_HOST_URL') || dbUrl
// const cluster = 'ac-qk5erug-shard-00-00.uguptgl.mongodb.net'

// const db = new DbConnection(dbName, dbHostUrl, cluster)
// await db.connect()

await app.listen()
console.log('app started...')
