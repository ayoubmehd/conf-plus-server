import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, Types, Schema as MSchema } from 'mongoose';
import { User } from 'src/users/users.schema';

export type ConferenceDocument = Conference & Document;

@Schema()
export class Conference {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: Types.ObjectId;

  @Exclude()
  __v: number;

  @Transform(
    ({ value }) =>
      value.map((u) => {
        const { password, __v, ...rest } = u;

        return {
          ...rest,
          _id: rest._id.toString(),
        };
      }),
    { toPlainOnly: true },
  )
  @Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: Date, required: true })
  date: Date;

  constructor(partial: Partial<Conference>) {
    Object.assign(this, partial);
  }
}

export const ConferenceSchema = SchemaFactory.createForClass(Conference);

// ConferenceSchema.virtual("users", {
//   ref: "User",
//   localField: "",
//   foreignField: "_id",
// });
