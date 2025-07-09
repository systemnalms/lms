import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @MinLength(6)
  password!: string;
}
