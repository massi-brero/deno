import { Collection } from 'https://deno.land/x/mongo@v0.31.0/mod.ts';
import { ObjectId } from 'https://deno.land/x/mongo@v0.31.0/mod.ts';

import { db } from '../config/db.ts';
import { ResolversProps } from '../config/deps.ts';

const paket = db.getDatabase().collection('paket')
const zahlung = db.getDatabase().collection('zahlung')

const createType = (collection: Collection<any>) => {
  return async (
    _parent: any,
    { input: { ...attributes } }: any,
    _context: any,
    _info: any
  ) => {
    const insertId = await collection.insertOne({
      ...attributes,
    })

    const selectedEntity = await collection.findOne({
      _id: insertId,
    })

    if (selectedEntity) {
      selectedEntity._id = insertId.toString()
    }

    return selectedEntity
  }
}

export const ZahlungserfassungResolvers: ResolversProps = {
  Query: {
    paket: async (_parent: any, { _id }: any, _context: any, _info: any) => {
      const paketSelect = await paket.findOne({ _id: new ObjectId(_id) })

      const zahlungSelect = await zahlung
        .find({ paketId: { $eq: paketSelect?.paketnummer } })
        .toArray()

      if (paketSelect) {
        paketSelect._id = _id.toString()
        paketSelect.zahlungen = zahlungSelect
      }

      return paketSelect || null
    },

    zahlung: async (_parent: any, { _id }: any, _context: any, _info: any) => {
      const zahlungSelect = await paket.findOne({ _id: new ObjectId(_id) })

      if (zahlungSelect) {
        zahlungSelect._id = _id.toString()
      }
      return zahlungSelect || null
    },
    zahlungen: async (_parent: any, args: any, _context: any, _info: any) => {
      return await zahlung.find().toArray()
    },
    pakete: async (_parent: any, args: any, _context: any, _info: any) => {
      const paketeSelect = await paket.find().toArray()

      const paketResult = paketeSelect.map(async (paket) => {
        const zahlungSelect = await zahlung
          .find({ paketId: { $eq: paket.paketnummer } })
          .toArray()

        console.log(zahlungSelect)

        paket._id = paket._id.toString()
        paket.zahlungen = zahlungSelect

        return paket
      })

      return paketResult
    },
  },
  Mutation: {
    paket: createType(paket),
    zahlung: createType(zahlung),
  },
}
