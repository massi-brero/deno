import { gql } from '../config/deps.ts'

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
    paketId : String!
    betrag : Float!
    bic: String!
    einzahlungstag: Date!
}

input ZahlungInput {
    paketId : String!
    betrag : Float!
    bic: String!
    einzahlungstag: Date!
}

extend type Query {
  getPaket(_id: ID): Paket
  getZahlung(_id: ID): Zahlung
}

extend type Mutation {
  createPaket(input: PaketInput): Paket
  createZahlung(input: ZahlungInput): Zahlung
}
`
