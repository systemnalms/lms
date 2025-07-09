import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmConfig } from 'libs/common/config/typeorm.config';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentsModule } from './appointment.module';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Register Appointment entity with TypeORM
    TypeOrmModule.forRoot(createTypeOrmConfig([Appointment])),

    // Feature module
    AppointmentsModule,
  ],
})
export class AppModule {}
