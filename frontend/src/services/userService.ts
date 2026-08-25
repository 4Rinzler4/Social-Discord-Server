import { URLs } from '@/constants/requests'
import { appApi } from '@/redux/apiSlice'
import type { Lang } from '@/types/commonTypes'
import { ApiMethod } from '@/types/enums/commonEnums'
import type { LangParam, UserResponse } from '@/types/servicesTypes'

const { GET, PATCH } = ApiMethod

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

    updateLang: build.mutation<Lang, LangParam>({
      query: (body) => ({
        url: URLs.user.updateLanguage,
        method: PATCH,
        body,
      }),
      invalidatesTags: ['Me'],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetMeQuery,
  useUpdateLangMutation,
} = userService
