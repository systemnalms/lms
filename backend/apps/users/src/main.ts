import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getTCPClientConfig } from 'libs/constants/config.service';
import { ResponseInterceptor } from 'libs/common/interceptors/response.interceptor';
import { AllExceptionsFilter } from 'libs/common/filters/http-exception.filter';
import { SERVICES } from 'libs/constants/service-map';
import { generateUserSwaggerDoc } from '../swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  const doc = generateUserSwaggerDoc(app);
  SwaggerModule.setup('docs', app, doc);

  app.connectMicroservice<MicroserviceOptions>(
    getTCPClientConfig(SERVICES.USERS),
  );

  app.use('/swagger-json', (req: Request, res: Response) => {
    const doc = generateUserSwaggerDoc(app);
    res.json(doc);
  });

  await app.startAllMicroservices();
  await app.listen(3101);
  console.log('🚀 Users service running on http://localhost:3101');
}
void bootstrap();
