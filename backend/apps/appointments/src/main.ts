import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getTCPClientConfig } from 'libs/constants/config.service';
import { ResponseInterceptor } from 'libs/common/interceptors/response.interceptor';
import { AllExceptionsFilter } from 'libs/common/filters/http-exception.filter';
import { JwtAuthGuard } from 'apps/auth/guards/jwt-auth.guard';
import { SERVICES } from 'libs/constants/service-map';
import { generateAppointmentSwaggerDoc } from '../swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🌐 Enable CORS for web clients
  app.enableCors({
    origin: '*',
  });

  // 📌 Global Interceptors & Filters
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // 🔐 Global Auth Guard with Reflector to support @Public()
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // 📄 Swagger (with JWT support)
  const swaggerDoc = generateAppointmentSwaggerDoc(app);
  SwaggerModule.setup('docs', app, swaggerDoc);
  app.use('/swagger-json', (req: Request, res: Response) => {
    res.json(swaggerDoc);
  });

  // 🔌 Microservice setup (TCP)
  app.connectMicroservice<MicroserviceOptions>(
    getTCPClientConfig(SERVICES.APPOINTMENTS),
  );

  // 🚀 Start everything
  await app.startAllMicroservices();
  await app.listen(3003, '0.0.0.0');
  console.log('🚀 Appointments service running on http://localhost:3003');
}

void bootstrap();
