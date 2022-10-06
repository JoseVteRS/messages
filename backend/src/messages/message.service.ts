import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageCreateOneToAllDto } from './dtos/create-message-one-to-all.dto';
import { MessageCreateOneToOneDto } from './dtos/create-message-one-to-one.dto';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
  ) {}

  public async sendOneToOne(messageData: MessageCreateOneToOneDto) {
    try {
      const newMessage = await this.messageModel.create(messageData);
      return newMessage;
    } catch (error) {
      throw new InternalServerErrorException(
        `Server internal error: ${error.message}`,
      );
    }
  }

  public async sendOneToAll(messageData: MessageCreateOneToAllDto) {
    try {
      const newMessage = await this.messageModel.create(messageData);
      return newMessage;
    } catch (error) {
      throw new InternalServerErrorException(
        `Server internal error: ${error.message}`,
      );
    }
  }

  public async listOneToOne(senderId: string, receiverId: string) {
    try {
      const messages = await this.messageModel.find({
        receiver: receiverId,
        sender: senderId,
      });
      return messages;
    } catch (error) {
      throw new InternalServerErrorException(
        `Server internal error: ${error.message}`,
      );
    }
  }

  public async listOneToAll() {
    try {
      const messages = await this.messageModel.find();
      return messages;
    } catch (error) {
      throw new InternalServerErrorException(
        `Server internal error: ${error.message}`,
      );
    }
  }
}
