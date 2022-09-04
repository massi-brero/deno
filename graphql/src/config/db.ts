import { Bson, MongoClient } from 'https://deno.land/x/mongo@v0.31.0/mod.ts';

export class DbConnection {
  public client = new MongoClient()

  constructor(
    public dbName: string,
    public url: string,
    public cluster: string
  ) {
    this.dbName = dbName
    this.url = url
  }

  public async connect() {
    await this.client.connect(this.url)
  }

  public async connectToAtlas() {
    await this.client.connect({
      db: dbName,
      tls: true,
      servers: [
        {
          host: cluster,
          port: 27017,
        },
      ],
      credential: {
        username: 'root',
        password: 'root',
        db: dbName,
        mechanism: 'SCRAM-SHA-1',
      },
    })
  }

  public getDatabase() {
    return this.client.database(this.dbName)
  }
}

const dbUrl = 'mongodb://127.0.0.1:27017/'
const dbName = Deno.env.get('DB_NAME') || 'deno-graphql'
const dbHostUrl = Deno.env.get('DB_HOST_URL') || dbUrl
const cluster = 'ac-qk5erug-shard-00-00.uguptgl.mongodb.net'

const db = new DbConnection(dbName, dbHostUrl, cluster)
await db.connect()

export { db }
