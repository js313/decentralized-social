import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(address: string) {
    return this.jwtService.sign({ address });
  }

  verifyJwt(token: string) {
    return this.jwtService.verify(token);
  }
}
