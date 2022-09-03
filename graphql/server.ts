import 'https://deno.land/x/dotenv/load.ts';

import { App } from './src/app.ts';
import { DbConnection } from './src/config/db.ts';

const PORT = parseInt(Deno.env.get('PORT') || '8080') || 8080
const app = new App(PORT)

const dbUrl =
  'mongodb+srv://root:root@cluster0.uguptgl.mongodb.net/?retryWrites=true&w=majority'
const dbName = Deno.env.get('DB_NAME') || 'deno-graphql'
const dbHostUrl = Deno.env.get('DB_HOST_URL') || dbUrl
const cluster = 'ac-qk5erug-shard-00-01.uguptgl.mongodb.net'
const db = new DbConnection(dbName, dbHostUrl, cluster)

db.connectToAtlas()
app.listen()
