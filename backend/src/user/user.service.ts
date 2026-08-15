import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { AppLangDto } from './dto/lang.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.prismaService.user.findMany();
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        avatarUrl: true,
        fullname: true,
        nickname: true,
        status: true,
        email: true,
        appLang: true,
        posts: true,
        followers: true,
        followings: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }
    return {
      ...user,
      avatarUrl: this.supabaseService.getPublicUrl('avatars', user.avatarUrl),
    };
  }

  async updateLanguage(userId: string, dto: AppLangDto) {
    const { appLang } = dto;
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        appLang,
      },
      select: {
        id: true,
        appLang: true,
      },
    });
  }
}
