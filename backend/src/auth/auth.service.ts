import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp(data: CreateUserDto) {
    const user = await this.userService.createUser(data);
    return user;
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
