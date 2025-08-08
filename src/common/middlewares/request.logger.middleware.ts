import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(RequestLoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      let logMessage = `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`;

      if (['POST', 'PUT', 'PATCH'].includes(method) && Object.keys(body).length > 0) {
        logMessage += ` - Body: ${JSON.stringify(body)}`;
      }

      this.logger.debug(logMessage);
    });

    next();
  }
}
