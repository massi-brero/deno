import { MongoClient } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

export class DbConnection {
  public client = new MongoClient()

  constructor(public dbName: string, public url: string) {
    this.dbName = dbName
    this.url = url
  }

  public connect() {
    this.client.connectWithUri(this.url)
  }

  public getDatabase() {
    this.client.database(this.dbName)
  }
}

const dbUrl = 'mongodb+srv://root:<password>@cluster0.uguptgl.mongodb.net/test'
const dbName = Deno.env.get('DB_NAME') || 'deno-graphql'
const dbHostUrl = Deno.env.get('DB_HOST_URL') || dbUrl
const db = new DbConnection(dbName, dbHostUrl)
db.connect()

export { db }
