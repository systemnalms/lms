import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Public } from 'apps/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'apps/auth/guards/jwt-auth.guard';
import { RegisterDto } from 'apps/auth/dto/register.dto';
import { LoginDto } from 'apps/auth/dto/login.dto';
import { ForgotPasswordDto } from 'apps/auth/dto/forgot-password.dto';
import { Request, Response } from 'express';

@Controller('auth') // Unified base path for frontend
export class AuthGatewayController {
  private readonly authServiceUrl = 'http://auth:3000/auth'; // Docker service URL

  constructor(private readonly httpService: HttpService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.authServiceUrl}/register`, dto),
    );
    return res.status(response.status).json(response.data);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.authServiceUrl}/login`, dto),
    );
    return res.status(response.status).json(response.data);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Res() res: Response) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.authServiceUrl}/forgot-password`, dto),
    );
    return res.status(response.status).json(response.data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: Request, @Res() res: Response) {
    const jwt = req.headers.authorization;
    const response = await firstValueFrom(
      this.httpService.get(`${this.authServiceUrl}/profile`, {
        headers: { Authorization: jwt },
      }),
    );
    return res.status(response.status).json(response.data);
  }

  @Public()
  @Get('health')
  async health(@Res() res: Response) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.authServiceUrl}/health`),
    );
    return res.status(response.status).json(response.data);
  }
}
