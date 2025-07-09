import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntitySchema, ObjectType } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const createTypeOrmConfig = (
  entities: (ObjectType<any> | EntitySchema<any> | string)[] = [],
  dbName = process.env.POSTGRES_DB || 'dental_db',
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: dbName,
  entities,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
});
