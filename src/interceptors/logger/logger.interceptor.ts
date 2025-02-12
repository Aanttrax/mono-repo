import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('RouterExplorer');
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const method = req.method;
    const url = req.url;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const statusCode = res.statusCode;
        const responseTime = Date.now() - startTime;
        this.logger.log(`Completed {${url}, ${method}} -> status: ${statusCode}, responseTime: +${responseTime}ms`);
      }),
    );
  }
}
