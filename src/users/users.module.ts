import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import MongooseClassSerializerInterceptor from '../interceptors/mongooseClassSerializer.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MongooseClassSerializerInterceptor(User),
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
