import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  RegisterRequest,
  LoginRequest,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './interfaces/jwt.interface';
import { StringValue } from 'ms';
import type { Response, Request } from 'express';
import { isDev } from '../utils/is-dev.util';
import { TYPE_TOKENS } from '../consts/common';
import { MailService } from '../mail/mail.service';

const { RESET_TOKEN } = TYPE_TOKENS;

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly JWT_RESET_TOKEN_TTL: string;

  private readonly COOKIE_DOMAIN: string;
  private readonly CLIENT_URL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.JWT_RESET_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_RESET_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
    this.CLIENT_URL = configService.getOrThrow<string>('CLIENT_URL');
  }

  async register(res: Response, dto: RegisterRequest) {
    const { nickname, fullname, email, password, avatarUrl, appLang } = dto;
    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existUser) {
      throw new ConflictException({ code: 'USER_ALREADY_REGISTERED' });
    }

    const hashedPassword = await hash(password);

    const user = await this.prismaService.user.create({
      data: {
        nickname,
        fullname,
        email,
        password: hashedPassword,
        avatarUrl,
        appLang,
        status: '',
      },
      select: {
        id: true,
        nickname: true,
        fullname: true,
        email: true,
        appLang: true,
        avatarUrl: true,
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequest) {
    const { email, password } = dto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new NotFoundException({ code: 'USER_NOT_REGISTERED' });
    }

    const isValidPassword = await verify(user.password, password);
    if (!isValidPassword) {
      throw new UnauthorizedException({ code: 'INVALID_CREDENTIALS' });
    }
    return this.auth(res, user.id);
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'] as StringValue;
    if (!refreshToken) {
      throw new UnauthorizedException({ code: 'INVALID_REFRESH_TOKEN' });
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

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        appLang: true,
      },
    });

    if (!user) return;

    const resetToken = this.generateResetToken(user.id);
    const resetUrl = `${this.CLIENT_URL}/reset-password?resetToken=${resetToken}`;

    await this.mailService.sendPasswordResetEmail({
      email: user.email,
      resetUrl: resetUrl,
      language: user.appLang,
    });
    return { message: 'The password link has been sended' };
  }

  async resetPassword(dto: ResetPasswordDto) {}

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

  private generateResetToken(id: string) {
    const payload: JwtPayload = { id, type: RESET_TOKEN };

    const resetToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_RESET_TOKEN_TTL as StringValue,
    });

    return { resetToken };
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
