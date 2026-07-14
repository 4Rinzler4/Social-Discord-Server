import { type NestMiddleware, Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
