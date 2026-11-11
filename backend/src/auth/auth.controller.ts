import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { LocalAuthGuard } from '../guards/local-auth.guard.js';
import { JwtAuthGuard } from '../guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-profile')
  async getProfile() {
    return "asd";
  }

}
