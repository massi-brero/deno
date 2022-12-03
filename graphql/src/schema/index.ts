import { gql } from '../config/deps.ts'
import { ZahlungserfassungTypes } from './zahlungserfassung.ts'

export const Schema = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  ${ZahlungserfassungTypes}
`
