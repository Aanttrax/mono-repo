import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ type: String, required: true, min: 3, max: 15, trim: true })
  userName: string;

  @Prop({ type: String, required: true })
  password: boolean;

  @Prop({ type: String, required: true, trim: true, lowercase: true, max: 15 })
  name: string;

  @Prop({ type: String, required: true, trim: true, lowercase: true, max: 15 })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
