import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

export interface userCreateDto {
  username: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/create')
  createUser(@Body() createDto: userCreateDto) {
    return this.userService.createUser(createDto);
  }
}
