import { URLs } from '@/constants/requests'
import { appApi } from '@/redux/apiSlice'
import { ApiMethod } from '@/types/enums/common-enums'
import type { UserResponse } from '@/types/response-types'

const { GET } = ApiMethod

export const userService = appApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<UserResponse[], void>({
      query: () => ({ url: URLs.user.get, method: GET }),
    }),

    getUserById: build.query<UserResponse, string>({
      query: (userId) => ({
        url: `${URLs.user.get}/${userId}`,
        method: GET,
      }),
    }),

    getMe: build.query<UserResponse, void>({
      query: () => ({
        url: URLs.user.myProfile,
        method: GET,
      }),
      providesTags: ['Me'],
    }),
  }),
})

export const { useGetAllUsersQuery, useGetUserByIdQuery, useGetMeQuery } =
  userService
