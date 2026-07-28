import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { AuthUser } from '../../types/auth-user.types';

export const CurrentUser = createParamDecorator(
  (field: keyof AuthUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as AuthUser | undefined;
    if (!user) {
      return undefined;
    }

    return field ? user[field] : user;
  },
);
