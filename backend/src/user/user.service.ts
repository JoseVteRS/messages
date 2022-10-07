import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly redis: RedisService,
  ) {}

  async list() {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        `Server internal error: ${error.message}`,
      );
    }
  }
}
