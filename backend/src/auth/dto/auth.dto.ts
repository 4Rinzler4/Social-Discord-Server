import { AppLangEnum } from '../../generated/prisma/client';

export class RegisterRequest {
  nickname!: string;
  fullname!: string;
  email!: string;
  password!: string;
  appLang!: AppLangEnum;
  avatarUrl?: string;
  status?: string;
}

export class LoginRequest {
  email!: string;
  password!: string;
}
