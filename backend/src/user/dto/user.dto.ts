export class UserResponseDto {
  id!: string;
  nickname!: string;
  fullname!: string;
  email!: string;
  avatarUrl?: string | null;
  status!: string;
}
