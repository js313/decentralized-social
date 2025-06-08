import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@Req() req: any) {
    const walletAddress = req.user.wallet_address;

    return this.usersService.getUser(walletAddress);
  }

  @Get(':wallet')
  async getUser(@Param('wallet') wallet: string): Promise<User | null> {
    return this.usersService.getUser(wallet);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrUpdate(@Req() req, @Body() body: Partial<User>): Promise<User> {
    const walletAddress = req.user.wallet_address;
    return this.usersService.createOrUpdateUser({
      ...body,
      wallet_address: walletAddress,
    });
  }
}
