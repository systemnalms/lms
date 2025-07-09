import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const rawResponse: unknown =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message: string;
    if (typeof rawResponse === 'string') {
      message = rawResponse;
    } else if (
      rawResponse &&
      typeof rawResponse === 'object' &&
      'message' in rawResponse &&
      typeof (rawResponse as { message?: unknown }).message === 'string'
    ) {
      message = (rawResponse as { message: string }).message;
    } else if ((exception as Error)?.message) {
      message = (exception as Error).message;
    } else {
      message = 'Internal server error';
    }

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
