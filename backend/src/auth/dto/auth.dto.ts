export class RegisterRequest {
  nickname!: string;
  fullname!: string;
  email!: string;
  password!: string;
  avatarUrl?: string;
  status?: string;
}

export class LoginRequest {
  email!: string;
  password!: string;
}
