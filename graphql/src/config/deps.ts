import { config } from 'https://deno.land/x/dotenv/mod.ts'
import { Application, Router } from 'https://deno.land/x/oak@v10.0.0/mod.ts'
import {
  applyGraphQL,
  gql,
  ResolversProps,
} from 'https://deno.land/x/oak_graphql/mod.ts'
import {
  GraphQLScalarType,
  Kind,
} from 'https://raw.githubusercontent.com/adelsz/graphql-deno/v15.0.0/mod.ts'

export {
  Application,
  GraphQLScalarType,
  Kind,
  gql,
  applyGraphQL,
  config,
  Router,
}
export type { ResolversProps }
