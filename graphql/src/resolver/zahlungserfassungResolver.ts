import { db } from '../config/db.ts'
import { ResolversProps } from '../config/deps.ts'

const paket = db.getDatabase().collection('paket')
const zahlung = db.getDatabase().collection('zahlung')

export const ZahlungserfassungResolvers: ResolversProps = {
  Query: {
    getPaket: async (_parent: any, { _id }: any, _context: any, _info: any) => {
      const paketSelect = await paket.findOne({
        _id: {
          $oid: _id,
        },
      })

      const zahlungSelect = await zahlung.find({ paketId: { $eq: _id } })
      const allzahlungs = await zahlungSelect.map((zahlung: any) => {
        return {
          ...zahlung,
          _id: zahlung._id.$oid,
        }
      })

      if (paketSelect) {
        paketSelect._id = _id
        paketSelect.zahlung = allzahlungs
      }

      return paketSelect || null
    },

    getZahlung: async (
      _parent: any,
      { _id }: any,
      _context: any,
      _info: any
    ) => {
      const zahlungSelect = await paket.findOne({
        _id: {
          $oid: _id,
        },
      })

      if (zahlungSelect) {
        zahlungSelect._id = _id
      }
      return zahlungSelect || null
    },
  },
  Mutation: {
    createPaket: async (
      _parent: any,
      { input: { ...attributes } }: any,
      _context: any,
      _info: any
    ) => {
      const insertId = await paket.insertOne({
        ...attributes,
      })

      const selectedEntity = await paket.findOne({
        _id: insertId,
      })

      console.log(selectedEntity)

      if (selectedEntity) {
        selectedEntity._id = insertId.toString()
      }

      return selectedEntity
    },
    createZahlung: async (
      _parent: any,
      { input: { ...attributes } }: any,
      _context: any,
      _info: any
    ) => {
      const insertzahlungId = await zahlung.insertOne({
        ...attributes,
      })

      const zahlungSelect = await zahlung.findOne({
        _id: insertzahlungId,
      })

      if (zahlungSelect) {
        zahlungSelect._id = insertzahlungId.toString()
      }
      return zahlungSelect
    },
  },
}
