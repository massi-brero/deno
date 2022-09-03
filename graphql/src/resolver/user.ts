export const UserResolvers = {
  Query: {
    getUser: (parent: any, { id }: any, context: any, info: any) => {
      return {
        firstname: 'Maxl',
        lastname: 'Brerow',
      }
    },
  },
  Mutation: {
    setUser: (
      parent: any,
      { input: { firstname, lastname } }: any,
      context: any,
      info: any
    ) => {
      console.log('input', firstname, lastname)
      return {
        done: true,
      }
    },
  },
}
