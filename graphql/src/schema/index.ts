import { gql } from '../config/deps.ts'
import { UserTypes } from 'user.ts'
import { AuthorTypes } from 'author.ts'

export const Schems = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  ${UserTypes}
  ${AuthorTypes}
`
