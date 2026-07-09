export interface SignUpResponse {
  userId: string;
}
export interface SignUpParams {
  nickname: string;
  fullname: string;
  email: string;
  password: string;
}

export interface LogInResponse {
  userId: string;
}
export interface LogInParams {
  nickname: string;
  email: string;
  password: string;
}
