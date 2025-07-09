#!/bin/bash

# Usage: ./generate-microservice.sh users 3001

SERVICE_NAME=$1
PORT=$2

if [ -z "$SERVICE_NAME" ] || [ -z "$PORT" ]; then
  echo "Usage: $0 <service-name> <tcp-port>"
  exit 1
fi

APP_DIR="apps/$SERVICE_NAME/src"
mkdir -p $APP_DIR

# Create main.ts
cat > $APP_DIR/main.ts <<EOF
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ${SERVICE_NAME^}Module } from './${SERVICE_NAME}.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(${SERVICE_NAME^}Module, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: $PORT,
    },
  });
  await app.listen();
}
bootstrap();
EOF

# Create module
cat > $APP_DIR/${SERVICE_NAME}.module.ts <<EOF
import { Module } from '@nestjs/common';
import { ${SERVICE_NAME^}Controller } from './${SERVICE_NAME}.controller';

@Module({
  controllers: [${SERVICE_NAME^}Controller],
})
export class ${SERVICE_NAME^}Module {}
EOF

# Create controller
cat > $APP_DIR/${SERVICE_NAME}.controller.ts <<EOF
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ${SERVICE_NAME^}Controller {
  @MessagePattern({ cmd: 'ping' })
  ping() {
    return { message: '${SERVICE_NAME} microservice is running' };
  }
}
EOF

# Optional service
cat > $APP_DIR/${SERVICE_NAME}.service.ts <<EOF
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${SERVICE_NAME^}Service {
  // Add your business logic here
}
EOF

echo "✅ Microservice '$SERVICE_NAME' created at '$APP_DIR' on port $PORT."
