import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class DocsController {
  @MessagePattern({ cmd: 'ping' })
  ping() {
    return { message: 'docs microservice is running' };
  }
}
