import { URLs } from '@/constants/requests'
import { appApi } from '@/redux/apiSlice'
import { ApiMethod } from '@/types/enums/commonEnums'
import type { CreatePostParams, PostResponse } from '@/types/servicesTypes'

const { GET, POST, DELETE } = ApiMethod

export const postsService = appApi.injectEndpoints({
  endpoints: (build) => ({
    getPostsByUserId: build.query<PostResponse[], string>({
      query: (userId) => ({
        url: `${URLs.post.getByUserId}/${userId}`,
        method: GET,
      }),
    }),

    getPostById: build.query<PostResponse, string>({
      query: (postId) => ({ url: `${URLs.post.get}/${postId}`, method: GET }),
    }),

    createPost: build.mutation<void, CreatePostParams>({
      query: ({ image, description }) => {
        const formData = new FormData()
        formData.append('image', image)
        if (description) {
          formData.append('description', description)
        }
        return {
          url: URLs.post.create,
          method: POST,
          body: formData,
        }
      },
    }),

    deletePost: build.mutation<void, string>({
      query: (postId) => ({
        url: `${URLs.post.delete}/${postId}`,
        method: DELETE,
      }),
    }),
  }),
})

export const {
  useGetPostsByUserIdQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsService
