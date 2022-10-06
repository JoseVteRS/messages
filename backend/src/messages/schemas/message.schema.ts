import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { v4 as generateUuid } from 'uuid';

export type MessageDocument = Message & Document;

@Schema({
  timestamps: true,
  _id: false,
})
export class Message {
  @Prop({ type: String, default: () => generateUuid() })
  _id: string;

  @Prop({ type: String, ref: User.name, required: true })
  sender: string;

  @Prop({ type: String, ref: User.name, required: false })
  receiver?: string;

  @Prop({ type: String, required: true, trim: true })
  messageText: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
