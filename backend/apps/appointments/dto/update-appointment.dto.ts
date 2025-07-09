import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export class UpdateAppointmentDto {
  @ApiProperty({ example: 'Teeth Cleaning' })
  @IsOptional()
  @IsString()
  service?: string;

  @ApiProperty({ example: '2025-07-01' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ example: '10:30' })
  @IsOptional()
  @IsString()
  time?: string;

  @ApiProperty({ example: 'Dr. Smith' })
  @IsOptional()
  @IsString()
  dentist?: string;

  @ApiProperty({ example: 'CONFIRMED', enum: AppointmentStatus })
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}
