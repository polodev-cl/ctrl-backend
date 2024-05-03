import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, } from '@nestjs/common';
import { Request, Response }                                             from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let {message} = exception.getResponse() as any;

    console.log('HTTP Exception Filter: ' + JSON.stringify(exception.getResponse()));

    if (Array.isArray(message)) message = message.join(', ');

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message || exception.getResponse() || exception.message || null,
    };

    this.logger.error('HTTP Exception Filter: ' + JSON.stringify(exception.getResponse()));

    response.status(status).json(errorResponse);
  }
}
