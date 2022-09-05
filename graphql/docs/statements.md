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
mutation insertAuthor($input: AuthorInput) {
  createAuthor(input: $input) {
    _id,
    lastName,
    firstName,
    email
  }
}
{
  "input": {"firstName":"Massi", "lastName": "Brero", "email": "m@b.de"}
}

mutation insertAPost($input: PostInput) {
    createPost(input: $input) {
        _id,
        postTitle,
        postCategory,
        postDate
    }
}
{
  "input": {
    "postDate":"2022-09-05",
    "authorId": "1111",
    "postTitle": "Test Post",
    "postCategory": "GraphQL"
    }
}
```
