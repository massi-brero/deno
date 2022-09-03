import { db } from '../config/db.ts'
const author = db.getDatabase().collection('author')
const post = db.getDatabase().collection('post')

export const AuthorResolvers = {
  Query: {
    getAuthor: async (parent: any, { _id }: any, context: any, info: any) => {
      const authorSelect = await author.findOne({
        _id: {
          $oid: _id,
        },
      })

      const postSelect = await post.find({ authorId: { $eq: _id } })
      const allPosts = await postSelect.map((post: any) => {
        return {
          ...post,
          _id: post._id.$oid,
        }
      })

      authorSelect._id = _id
      authorSelect.post = allPosts

      return authorSelect
    },

    getPost: async (parent: any, { _id }: any, context: any, info: any) => {
      const postSelect = await author.findOne({
        _id: {
          $oid: _id,
        },
      })

      postSelect._id = _id
      return postSelect
    },
  },
  Mutation: {
    createPost: async (
      parent: any,
      { input: { authorId, postTitle, postCategory, postDate } }: any,
      context: any,
      info: any
    ) => {
      console.log('input', postCategory, postTitle)
      const insertPost = await post.insertOne({
        authorId,
        postTitle,
        postCategory,
        postDate,
      })

      const postSelect = await post.findOne({
        _id: {
          $oid: insertPost.$oid,
        },
      })
      postSelect._id = insertPost.$oid
      return postSelect
    },
  },
}
