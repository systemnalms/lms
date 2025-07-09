import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmConfig } from 'libs/common/config/typeorm.config';
import { UsersModule } from './users.module';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(createTypeOrmConfig([User])),
    UsersModule,
  ],
})
export class AppModule {}
