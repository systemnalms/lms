import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function generateAuthSwaggerDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('Auth microservice API')
    .setVersion('1.0')
    .build();

  return SwaggerModule.createDocument(app, config);
}
