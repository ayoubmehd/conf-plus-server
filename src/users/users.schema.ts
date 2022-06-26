import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';
import {} from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: Types.ObjectId;

  @Exclude()
  __v: number;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Exclude()
  @Prop()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
