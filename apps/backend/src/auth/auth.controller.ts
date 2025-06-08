import { Body, Controller, Post } from '@nestjs/common';
import { verifyMessage } from 'ethers';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('verify')
  async verifySignature(
    @Body() body: { address: string; signature: string; message: string },
  ) {
    const { address, signature, message } = body;

    const signerAddress = verifyMessage(message, signature);
    const isValid = signerAddress.toLowerCase() === address.toLowerCase();

    if (!isValid) return { success: false, message: 'Invalid signature' };

    const token = this.authService.generateJwt(address);
    this.usersService.createOrUpdateUser({ wallet_address: address });
    return { success: true, token };
  }
}
