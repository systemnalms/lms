import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getTCPServerConfig } from 'libs/constants/config.service';
import { ResponseInterceptor } from 'libs/common/interceptors/response.interceptor';
import { AllExceptionsFilter } from 'libs/common/filters/http-exception.filter';
import { SERVICES } from 'libs/constants/service-map';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { generateAuthSwaggerDoc } from '../swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  // app.enableCors({
  //   origin: 'http://localhost:3001',
  //   credentials: true,
  // });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  // 👇 Auth service listens as TCP microservice
  app.connectMicroservice<MicroserviceOptions>(
    getTCPServerConfig(SERVICES.AUTH),
  );

  const doc = generateAuthSwaggerDoc(app);
  SwaggerModule.setup('docs', app, doc);

  app.use('/swagger-json', (req: Request, res: Response) => {
    const doc = generateAuthSwaggerDoc(app);
    res.json(doc);
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('🚀 Auth service running on http://localhost:3000');
}
void bootstrap();
