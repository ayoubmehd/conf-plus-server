import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoConfigService } from './mongo-config-service/mongo-config-service.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import session from 'express-session';
import MongoStore from 'connect-mongo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
      inject: [MongoConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongoConfigService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: this.configService.get('SESSION_SECRET'),
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: this.configService.get('NODE_ENV') === 'production',
            domain: this.configService.get('COOKIE_DOMAIN') || undefined,
          },
          store: MongoStore.create({
            mongoUrl: this.configService.get('MONGO_SESSION_URL'),
          }),
        }),
      )
      .forRoutes('*');
  }
}
