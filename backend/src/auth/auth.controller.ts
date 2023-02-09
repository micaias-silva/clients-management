import { Request } from 'express';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { JwtAuthGuard } from './shared/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    if (req.user) {
      return this.authService.login(req.user);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  async validate() {
    return true;
  }
}
