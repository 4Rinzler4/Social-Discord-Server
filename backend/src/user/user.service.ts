import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }
    return user;
  }
}
