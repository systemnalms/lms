import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function generateUserSwaggerDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Users Service')
    .setDescription('User microservice API')
    .setVersion('1.0')
    .build();

  return SwaggerModule.createDocument(app, config);
}
