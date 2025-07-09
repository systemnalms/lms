import { Controller, Post, Get, Param, Body, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';

@Controller('users') // base path for frontend
export class UsersGatewayController {
  private readonly usersServiceUrl = 'http://users:3101/users'; // Docker internal service name

  constructor(private readonly httpService: HttpService) {}

  @Post()
  async create(@Body() dto: any, @Res() res: Response) {
    const result = await firstValueFrom(
      this.httpService.post(`${this.usersServiceUrl}`, dto),
    );
    return res.status(result.status).json(result.data);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await firstValueFrom(
      this.httpService.get(`${this.usersServiceUrl}`),
    );
    return res.status(result.status).json(result.data);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string, @Res() res: Response) {
    const result = await firstValueFrom(
      this.httpService.get(`${this.usersServiceUrl}/email/${email}`),
    );
    return res.status(result.status).json(result.data);
  }

  @Get('health')
  async health(@Res() res: Response) {
    const result = await firstValueFrom(
      this.httpService.get(`${this.usersServiceUrl}/health`),
    );
    return res.status(result.status).json(result.data);
  }
}
