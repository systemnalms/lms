import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointment.controller';
import { AppointmentsService } from './appointment.service';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentRepository } from '../repositories/appointment.repository';

// JWT imports
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    AppointmentRepository,
    JwtStrategy, // Required so AuthGuard('jwt') works
  ],
  exports: [AppointmentRepository],
})
export class AppointmentsModule {}
