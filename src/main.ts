/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

process.loadEnvFile();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          frameAncestors: ["'self'"], // Equivalente a "frame-ancestors 'self';"
        },
      },
      crossOriginEmbedderPolicy: { policy: 'require-corp' },
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginResourcePolicy: { policy: 'same-origin' },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
      noSniff: true, // X-Content-Type-Options: nosniff
      frameguard: { action: 'sameorigin' }, // X-Frame-Options: SAMEORIGIN
      xssFilter: true, // X-XSS-Protection: 1; mode=block
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Permissions-Policy', 'geolocation=(self), camera=(self), microphone=(self)');
    next();
  });

  app.enableCors({ exposedHeaders: ['auth-token'] });
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
