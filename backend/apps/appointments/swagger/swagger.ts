import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function generateAppointmentSwaggerDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Appointments Service')
    .setDescription('Appointment microservice API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  return SwaggerModule.createDocument(app, config);
}
