import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}
  
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

}
