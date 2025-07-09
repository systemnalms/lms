import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { SERVICES, SERVICE_PORTS } from 'libs/constants/service-map';

const isDocker =
  process.env.NODE_ENV === 'production' || process.env.DOCKER === 'true';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret',
      signOptions: { expiresIn: '1h' },
    }),
    ClientsModule.register([
      {
        name: SERVICES.USERS,
        transport: Transport.TCP,
        options: {
          host: isDocker ? 'users' : 'localhost',
          port: SERVICE_PORTS[SERVICES.USERS],
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
