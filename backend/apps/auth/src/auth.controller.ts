import { Controller, Post, Body, Get, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { success, created } from 'libs/common/response';
import { Public } from '../decorators/public.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { SafeUser } from 'apps/users/mappers/user.mapper';
import { Response } from 'express';

export interface LoginResponse {
  accessToken: string;
  user: SafeUser;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return created(user, 'User registered');
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return success(result, 'Login successful');
  }

  @Public()
  @Post('forgot-password')
  async forgot(@Body() dto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(dto.email);
    return success(result, 'Password reset request sent');
  }

  @Get('profile')
  getProfile(@Request() req: Request & { user: JwtPayload }) {
    return success(req.user, 'Authenticated profile');
  }

  @Public()
  @Post('logout')
  logout(@Res() res: Response) {
    // Optional: clear a cookie if you were using one
    // res.clearCookie('jwt', { httpOnly: true, secure: true });

    return res.status(200).json(success(null, 'Logged out successfully'));
  }

  @Public()
  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
