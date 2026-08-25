import { URLs } from '@/constants/requests'
import { appApi } from '@/redux/apiSlice'
import { ApiMethod } from '@/types/enums/commonEnums'
import type { CommentResponse, CreateCommentParam } from '@/types/servicesTypes'
const { GET, POST, DELETE } = ApiMethod

export const commentService = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCommentsByPostId: build.query<CommentResponse[], string>({
      query: (postId) => ({
        url: `${URLs.comment.getCommentsByPost}/${postId}`,
        method: GET,
      }),
    }),
    createComment: build.mutation<void, CreateCommentParam>({
      query: (body) => ({
        url: URLs.comment.create,
        method: POST,
        body,
      }),
    }),
    deleteComment: build.mutation<void, string>({
      query: (commentId) => ({
        url: `${URLs.comment.delete}/${commentId}`,
        method: DELETE,
      }),
    }),
  }),
})

export const {
  useGetAllCommentsByPostIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentService
