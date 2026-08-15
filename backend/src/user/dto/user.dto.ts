import { AppLangEnum } from '../../generated/prisma/enums';

export class UserResponseDto {
  id!: string;
  nickname!: string;
  fullname!: string;
  email!: string;
  appLang!: AppLangEnum;
  avatarUrl!: string;
  status!: string;
}
