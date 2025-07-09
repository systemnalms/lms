import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3001', // your frontend
    credentials: true, // allow cookies
  });

  const config = new DocumentBuilder()
    .setTitle('Dental API Gateway')
    .setDescription('Unified API for Dental System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(5000);
  console.log(`🚪 Gateway running at http://localhost:5000`);
}
void bootstrap();
