import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'password123' })
  @IsOptional()
  @IsString()
  password?: string;
}
