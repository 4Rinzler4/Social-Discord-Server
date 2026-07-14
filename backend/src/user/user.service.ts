import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../generated/prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const { nickname, fullname, email, password, avatarUrl, status } = dto;
    const hashedPassword = await argon2.hash(password);
    return this.prisma.user.create({
      data: {
        nickname,
        fullname,
        email,
        password: hashedPassword,
        avatarUrl,
        status,
      },
      select: {
        id: true,
        nickname: true,
        fullname: true,
        email: true,
        avatarUrl: true,
        status: true,
        createdAt: true,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }
    return user;
  }
}
