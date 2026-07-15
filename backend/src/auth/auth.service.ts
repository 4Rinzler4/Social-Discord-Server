import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterRequest, LoginRequest } from './dto/auth.dto';
import { hash } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './interfaces/jwt.interface';
import { StringValue } from 'ms';
import type { Response, Request } from 'express';
import { isDev } from '../utils/is-dev.util';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(res: Response, dto: RegisterRequest) {
    const { nickname, fullname, email, password, avatarUrl } = dto;
    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existUser) {
      throw new ConflictException('User already registered');
    }

    const hashedPassword = await hash(password);

    const user = await this.prismaService.user.create({
      data: {
        nickname,
        fullname,
        email,
        password: hashedPassword,
        avatarUrl,
        status: '',
      },
      select: {
        id: true,
        nickname: true,
        fullname: true,
        email: true,
        avatarUrl: true,
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequest) {
    const { email } = dto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not registered');
    }
    return this.auth(res, user.id);
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'] as StringValue;
    if (!refreshToken) {
      throw new UnauthorizedException('');
    }

    const payload: JwtPayload = await this.jwtService.verify(refreshToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        select: { id: true },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.auth(res, user.id);
    }
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return { accessToken };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL as StringValue,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL as StringValue,
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: !isDev(this.configService) ? 'none' : 'lax',
    });
  }
}
