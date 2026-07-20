import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { User } from '../../generated/prisma/client';
import type { Request } from 'express';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const user = request.user as User | undefined;

    if (!user) {
      return undefined;
    }

    return data ? user[data] : user;
  },
);
