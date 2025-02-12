import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true, versionKey: false })
export class Task {
  @Prop({ type: String, required: true, lowercase: true, trim: true })
  title: string;

  @Prop({ type: String, required: true, min: 3, trim: true })
  description: string;

  @Prop({ type: Boolean, default: false })
  done: boolean;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
