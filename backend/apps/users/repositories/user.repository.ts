import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async updateUser(id: string, data: Partial<User>) {
    await this.repo.update(id, data);
    return this.repo.findOneByOrFail({ id });
  }

  async deleteUser(id: string) {
    return this.repo.delete(id);
  }

  async findAll() {
    return this.repo.find();
  }
}
