import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import MongoStore from 'connect-mongo';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    return session({
      secret: this.configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      secure: this.configService.get('NODE_ENV') === 'production',
      store: MongoStore.create({
        mongoUrl: this.configService.get('MONGO_SESSION_URL'),
      }),
    });
  }
}
