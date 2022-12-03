deno run --allow-net --allow-env --allow-write --allow-read --unstable server.ts

brew services start mongodb-community
brew services stop mongodb-community

brew upgrade mongodb-community
mongod --dbpath=/Users/massi.brero/mongodb/data/db/

deno compile --output="./bin/gql-server" --allow-env --allow-net --allow-read server.ts

```javascript
db.createUser({
  user: 'root',
  pwd: 'root',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }],
})
```

Debug

npx diagnose-endpoint@1.1.0 --endpoint=http://localhost:8888/graphql

Mongo Shell
mongosh

Query & Mutations

````json

query getPakete {
  pakete {
    _id,
    zahlungen {
      betrag,
      bic,
      einzahlungstag
    }
  }
}

mutation createaket($input: PaketInput!) {
  paket(input: $input) {
    erfassungstag,
    kontoauszugsnummer,
    paketnummer,
    zahlungsweg,
  }
}
{
  "input": {
    "erfassungstag": "2022-09-10",
    "kontoauszugsnummer": 123,
    "paketnummer": 1,
    "zahlungsweg": "Zahlungsweg 1",
  }
}

mutation zahlung($input: ZahlungInput!) {
    zahlung(input: $input) {
      paketId,
      betrag,
      bic,
      einzahlungstag,
    }
}
{
  "input": {
    "paketId" : 1,
    "betrag" : 1220.99,
    "bic": "BRLADE22",
    "einzahlungstag": "2022-09-10",
    }
}

```json
{
  paket(_id: "631661d1a27fbe303bc29594") {
    kontoauszugsnummer,
    zahlungen {
      bic,
      einzahlungstag
    }
  }
}

````
