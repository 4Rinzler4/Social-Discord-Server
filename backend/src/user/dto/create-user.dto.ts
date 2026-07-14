export class CreateUserDto {
  nickname!: string;
  fullname!: string;
  email!: string;
  avatarUrl?: string;
  password!: string;
  status!: string;
}

export class UserResponseDto {
  id!: string;
  nickname!: string;
  fullname!: string;
  email!: string;
  avatarUrl?: string | null;
  status!: string;
  createdAt!: Date;
}
