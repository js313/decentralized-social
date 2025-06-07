import { Body, Controller, Post } from '@nestjs/common';
import { verifyMessage } from 'ethers';

@Controller('auth')
export class AuthController {
  @Post('verify')
  verifySignature(
    @Body() body: { address: string; signature: string; message: string },
  ) {
    const { address, signature, message } = body;

    const signerAddress = verifyMessage(message, signature);
    const isValid = signerAddress.toLowerCase() === address.toLowerCase();

    return { success: isValid };
  }
}
