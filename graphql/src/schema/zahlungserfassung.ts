import { gql } from '../config/deps.ts';

export const ZahlungserfassungTypes = (gql as any)`

scalar Date

type Paket {
  _id: ID,
  erfassungstag: Date!
  kontoauszugsnummer: Int!
  paketnummer: Int!
  zahlungsweg: String!
  zahlungen: [Zahlung!]
}

input PaketInput {
  erfassungstag: Date!
  kontoauszugsnummer: Int!
  paketnummer: Int!
  zahlungsweg: String!
}

type Zahlung {
    _id : ID
    paketId : Int!
    betrag : Float!
    bic: String!
    einzahlungstag: Date!
}

input ZahlungInput {
    paketId : Int!
    betrag : Float!
    bic: String!
    einzahlungstag: Date!
}

extend type Query {
  zahlungen: [Zahlung]
  pakete: [Paket]
  paket(_id: Int!): Paket
  zahlung(_id: String!): Zahlung
}

extend type Mutation {
  paket(input: PaketInput!): Paket
  zahlung(input: ZahlungInput!): Zahlung
}
`
