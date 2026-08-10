import { URLs } from '@/constants/requests'
import { axiosClient } from '@/plugins/axiosClient'
import { appApi } from '@/redux/apiSlice'
import { authSuccess, logout } from '@/redux/reducer'
import type { AxiosResponse } from 'axios'
import { ApiMethod } from '@/types/enums/common-enums'
import type {
  LogInParams,
  LogInResponse,
  SignUpParams,
  SignUpResponse,
} from '@/interfaces/user-interfaces'
import { userService } from './user-service'
import { clearAccessToken, setAccessToken } from './token-service'

const { POST } = ApiMethod

export const AuthService = {
  refresh: (): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.auth.refresh)
  },
  forgetPassword: (email: string, lang: string): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.auth.forgetPassword, { email, lang })
  },
  resetPassword: (
    resetToken: string,
    newPassword: string,
  ): Promise<AxiosResponse> => {
    return axiosClient.patch(`${URLs.auth.resetPassword}/${resetToken}`, {
      password: newPassword,
    })
  },
}

export const authService = appApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, SignUpParams>({
      query: (body) => ({ url: URLs.auth.signUp, method: POST, body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setAccessToken(data.accessToken)
          dispatch(userService.util.invalidateTags(['Me']))
          dispatch(authSuccess())
        } catch (error) {
          console.log('SignUp failed', error)
        }
      },
    }),
    login: build.mutation<LogInResponse, LogInParams>({
      query: (body) => ({ url: URLs.auth.login, method: POST, body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setAccessToken(data.accessToken)
          dispatch(userService.util.invalidateTags(['Me']))
          dispatch(authSuccess())
        } catch {
          dispatch(logout())
        }
      },
    }),

    logout: build.mutation<void, void>({
      query: (body) => ({ url: URLs.auth.logout, method: POST, body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(logout())
        clearAccessToken()
      },
    }),
  }),
})

export const { useSignUpMutation, useLoginMutation, useLogoutMutation } =
  authService
