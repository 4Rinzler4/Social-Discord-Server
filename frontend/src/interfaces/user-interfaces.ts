export interface SignUpResponse {
  accessToken: string
}
export interface SignUpParams {
  nickname: string
  fullname: string
  email: string
  password: string
}

export interface LogInResponse {
  accessToken: string
}
export interface LogInParams {
  email: string
  password: string
}
