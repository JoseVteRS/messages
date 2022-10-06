import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() userData: UserCreateDto) {
    return this.userService.create(userData);
  }

  @Get('list')
  list() {
    return this.userService.list();
  }
}
