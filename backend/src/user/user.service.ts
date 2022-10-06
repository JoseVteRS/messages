import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { UserCreateDto } from './dtos/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  private readonly users: UserCreateDto[] = [];

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly redis: RedisService,
  ) {}

  HASH_SALT = 12;

  async create(userData: UserCreateDto) {
    try {
      const existsUser = await this.userModel.findOne({
        email: userData.email,
      });
      if (existsUser) throw new BadRequestException('User exists');

      const hashedPassword = await hash(userData.username, this.HASH_SALT);

      const newUser = await this.userModel.create({
        ...userData,
        password: hashedPassword,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `Server internal error: ${error.message}`,
      );
    }
  }

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
