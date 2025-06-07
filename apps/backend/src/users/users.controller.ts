import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':wallet')
  async getUser(@Param('wallet') wallet: string): Promise<User | null> {
    return this.usersService.getUser(wallet);
  }

  @Post()
  async createOrUpdate(@Body() body: Partial<User>): Promise<User> {
    return this.usersService.createOrUpdateUser(body);
  }
}
