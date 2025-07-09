import { IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export class CreateAppointmentDto {
  @ApiProperty({ example: 'Teeth Cleaning' })
  @IsString()
  service!: string;

  @ApiProperty({ example: '2025-07-01' })
  @IsDateString()
  date!: string;

  @ApiProperty({ example: '10:30' })
  @IsString()
  time!: string;

  @ApiProperty({ example: 'Dr. Smith' })
  @IsString()
  dentist!: string;

  @ApiProperty({
    example: 'PENDING',
    enum: AppointmentStatus,
    required: false,
    default: AppointmentStatus.PENDING,
  })
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus = AppointmentStatus.PENDING;
}
