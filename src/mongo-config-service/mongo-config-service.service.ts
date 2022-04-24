import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get<string>('MONGODB_URL'),
      // user: this.configService.get<string>('MONGODB_USER'),
      // pass: this.configService.get<string>('MONGODB_PASSWORD'),
    };
  }
}
