import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashedPassword });
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repo.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });
    return user === null ? undefined : user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.repo.update(id, dto);
    return this.repo.findOneByOrFail({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
