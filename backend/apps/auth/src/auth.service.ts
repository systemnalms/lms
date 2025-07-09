import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES } from 'libs/constants/service-map';
import { firstValueFrom } from 'rxjs';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICES.USERS) private readonly usersClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: any) {
    try {
      console.log('📦 Sending users_create with:', dto);

      const user: User = await firstValueFrom(
        this.usersClient.send('users_create', dto),
      );

      console.log('✅ User created:', user);
      return user;
    } catch (err) {
      console.error('🔥 Error during user registration:', err);
      throw err;
    }
  }

  async login(dto: { email: string; password: string }) {
    const response: { data: User } = await firstValueFrom(
      this.usersClient.send('users_find_by_email', dto.email),
    );

    const user: User = response?.data;

    if (!user || !dto.password) {
      throw new Error('User not found or no password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async forgotPassword(email: string) {
    const response: { data: User } = await firstValueFrom(
      this.usersClient.send('users_find_by_email', email),
    );

    const user: User = response?.data;

    if (!user) throw new Error('User not found');

    return { message: 'Password reset link sent (mock)' };
  }
}
