import { Module } from '@nestjs/common';
import { ConferenceGateway } from './conference.gateway';
import { ConferenceController } from './conference.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Conference, ConferenceSchema } from './conference.schema';
import { ConferenceService } from './conference.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import MongooseClassSerializerInterceptor from '../interceptors/mongooseClassSerializer.interceptor';
import { User, UserSchema } from '../users/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conference.name, schema: ConferenceSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    ConferenceGateway,
    ConferenceService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MongooseClassSerializerInterceptor(Conference),
    },
  ],
  controllers: [ConferenceController],
})
export class ConferenceModule {}
