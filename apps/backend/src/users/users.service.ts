import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async getUser(wallet: string): Promise<User | null> {
    return await this.usersRepo.findOne({ where: { wallet_address: wallet } });
  }

  async createOrUpdateUser(data: Partial<User>): Promise<User> {
    const user = this.usersRepo.create(data);
    return await this.usersRepo.save(user);
  }
}
