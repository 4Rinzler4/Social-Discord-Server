import { appApi } from '@/redux/apiSlice'
import { ApiMethod } from '@/types/enums/commonEnums'
const { GET, POST } = ApiMethod

type CommentResponse = {}

type CreateCommentParam = {}

export const commentService = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCommentsByPostId: build.query<CommentResponse[], string>({
      query: (postId) => ({
        url: `/${postId}`,
        method: GET,
      }),
    }),
    createComment: build.mutation<void, CreateCommentParam>({
      query: (body) => ({
        url: ``,
        method: POST,
        body,
      }),
    }),
  }),
})
