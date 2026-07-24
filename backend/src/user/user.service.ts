import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user.dto';
import { SupabaseService } from '../supabase/supabase.service';

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
}
