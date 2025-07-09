import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { success, created } from 'libs/common/response';
import { ApiTags } from '@nestjs/swagger';
// import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // HTTP
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return created(user, 'User created successfully');
  }

  @Get()
  async findAll() {
    const findAll = await this.usersService.findAll();
    return success(findAll, 'Users fetched successfully');
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const findByEmail = await this.usersService.findByEmail(email);
    return success(findByEmail, 'User fetched successfully');
  }

  // TCP
  @MessagePattern('users_create')
  async createUserTcp(@Payload() data: CreateUserDto) {
    const createUserTcp = await this.usersService.create(data);
    return created(createUserTcp, 'User created successfully');
  }

  @MessagePattern('users_find_by_email')
  async findByEmailTcp(@Payload() data: { email: string }) {
    const findByEmailTcp = await this.usersService.findByEmail(data.email);
    return success(findByEmailTcp, 'User fetched successfully');
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
