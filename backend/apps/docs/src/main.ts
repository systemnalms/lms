import { NestFactory } from '@nestjs/core';
import { DocsModule } from './docs.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

async function bootstrap() {
  const app = await NestFactory.create(DocsModule);

  const config = new DocumentBuilder()
    .setTitle('Central Swagger')
    .setDescription('Aggregates all microservice APIs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/self', app, document);

  const swaggerUrls = [
    { url: 'http://localhost:3101/swagger-json', name: 'Users Service' },
    { url: 'http://localhost:3000/swagger-json', name: 'Auth Service' },
    { url: 'http://localhost:3003/swagger-json', name: 'Appointments Service' },
  ];

  const swaggerApp = express();

  // ✅ No unnecessary type assertion
  swaggerApp.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      explorer: true,
      swaggerOptions: {
        urls: swaggerUrls,
      },
    }),
  );

  app.use(swaggerApp);

  await app.listen(4000);
  console.log(`✅ Central Swagger Docs running at http://localhost:4000/docs`);
}
void bootstrap();
