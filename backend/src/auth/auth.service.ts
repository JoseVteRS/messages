import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { UserCreateDto } from 'src/auth/dtos/register-user.dto';
import { User } from 'src/user/schema/user.schema';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly jwtService: JwtService,
  ) {}

  HASH_SALT = 12;

  async register(userData: UserCreateDto) {
    try {
      const existsUser = await this.userModel.findOne({
        email: userData.email,
      });
      if (!existsUser) throw new BadRequestException('User exists');

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

  async login(userData: LoginUserDto) {
    try {
      const existUserByEmail = await this.userModel.findOne({
        email: userData.email,
      });

      const validPassword = await compare(
        userData.password,
        existUserByEmail.password,
      );

      console.log(validPassword);

      // if (!existUserByEmail || !validPassword)
      //   throw new NotFoundException('User not found');

      const token = this.jwtService.sign(existUserByEmail._id);
      return { token };
    } catch (error) {
      throw new InternalServerErrorException(
        `Server internal error: ${error.message}`,
      );
    }
  }
}
