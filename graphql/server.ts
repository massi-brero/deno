import { App } from './src/app.ts'
import 'https://deno.land/x/dotenv/load.ts'
import { DbConnection } from './src/config/db.ts'

const PORT = parseInt(Deno.env.get('PORT') || '8080') || 8080
const app = new App(PORT)

const dbUrl = 'mongodb+srv://root:root@cluster0.uguptgl.mongodb.net/test'
const dbName = Deno.env.get('DB_NAME') || 'deno-graphql'
const dbHostUrl = Deno.env.get('DB_HOST_URL') || dbUrl
const db = new DbConnection(dbName, dbHostUrl)

db.connect()
app.listen()
