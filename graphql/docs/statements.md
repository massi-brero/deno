deno run --allow-net --allow-env --allow-write --allow-read --unstable server.ts

brew services start mongodb-community
brew services stop mongodb-community

brew upgrade mongodb-community
mongod --dbpath=/Users/massi.brero/mongodb/data/db/

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

```json
mutation insertPaket($input: PaketInput) {
  createPaket(input: $input) {
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

mutation insertZahlung($input: ZahlungInput) {
    createZahlung(input: $input) {
      paketId,
      betrag,
      bic,
      einzahlungstag,
    }
}
{
  "input": {
    "paketIdd" : "1254",
    "betrag" : 1220.99,
    "bic": "BRLADE22",
    "einzahlungstag": "2022-09-10",
    }
}
```
