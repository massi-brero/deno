import { db } from '../config/db.ts'
import { ResolversProps } from '../config/deps.ts'

const author = db.getDatabase().collection('author')
const post = db.getDatabase().collection('post')

export const AuthorResolvers: ResolversProps = {
  Query: {
    getAuthor: async (
      _parent: any,
      { _id }: any,
      _context: any,
      _info: any
    ) => {
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

      if (authorSelect) {
        authorSelect._id = _id
        authorSelect.post = allPosts
      }

      return authorSelect || null
    },

    getPost: async (_parent: any, { _id }: any, _context: any, _info: any) => {
      const postSelect = await author.findOne({
        _id: {
          $oid: _id,
        },
      })

      if (postSelect) {
        postSelect._id = _id
      }
      return postSelect || null
    },
  },
  Mutation: {
    createAuthor: async (
      _parent: any,
      { input: { firstName, lastName, email } }: any,
      _context: any,
      _info: any
    ) => {
      const insertAuthorId = await author.insertOne({
        firstName,
        lastName,
        email,
      })

      const authorSelect = await author.findOne({
        _id: insertAuthorId,
      })

      console.log(authorSelect)

      if (authorSelect) {
        authorSelect._id = insertAuthorId.toString()
      }

      return authorSelect
    },
    createPost: async (
      _parent: any,
      { input: { authorId, postTitle, postCategory, postDate } }: any,
      _context: any,
      _info: any
    ) => {
      const insertPostId = await post.insertOne({
        authorId,
        postTitle,
        postCategory,
        postDate,
      })

      const postSelect = await post.findOne({
        _id: insertPostId,
      })

      if (postSelect) {
        postSelect._id = insertPostId.toString()
      }
      return postSelect
    },
  },
}
