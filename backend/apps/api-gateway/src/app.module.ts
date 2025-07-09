import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

import { SERVICES } from 'libs/constants/service-map';

import { AuthGatewayController } from '../routes/auth.gateway.controller';
import { UsersGatewayController } from '../routes/users.gateway.controller';
import { AppointmentsGatewayController } from '../routes/appointments.gateway.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ClientsModule.register([
      {
        name: SERVICES.AUTH,
        transport: Transport.TCP,
        options: { port: 3000 },
      },
      {
        name: SERVICES.USERS,
        transport: Transport.TCP,
        options: { port: 3101 },
      },
      {
        name: SERVICES.APPOINTMENTS,
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
  ],
  controllers: [
    AuthGatewayController,
    UsersGatewayController,
    AppointmentsGatewayController,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
