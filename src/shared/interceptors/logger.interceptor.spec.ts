import { LoggerInterceptor } from './logger.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

describe('LoggerInterceptor', () => {
  let interceptor: LoggerInterceptor;
  let mockContext: ExecutionContext;
  let mockHandler: CallHandler;
  let mockLogger: jest.SpyInstance;

  beforeEach(() => {
    interceptor = new LoggerInterceptor();
    mockLogger = jest.spyOn(interceptor['logger'], 'log').mockImplementation();

    mockContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({ method: 'GET', url: '/test' })),
        getResponse: jest.fn(() => ({ statusCode: 200 })),
      })),
    } as unknown as ExecutionContext;

    mockHandler = {
      handle: jest.fn(() => of(null)), // Simulamos una respuesta sincrónica
    };
  });

  it('Debe estar definido', () => {
    expect(interceptor).toBeDefined();
  });

  it('Debe llamar a next.handle()', () => {
    interceptor.intercept(mockContext, mockHandler);
    expect(mockHandler.handle).toHaveBeenCalled();
  });

  it('Debe registrar la información de la petición', done => {
    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(1000) // Simula el tiempo de inicio
      .mockReturnValueOnce(1100); // Simula el tiempo de finalización

    interceptor.intercept(mockContext, mockHandler).subscribe(() => {
      expect(mockLogger).toHaveBeenCalledWith('Completed {/test, GET} -> status: 200, responseTime: +100ms');
      done();
    });
  });
});
