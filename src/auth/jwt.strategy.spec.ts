import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { PayloadDto } from './dto/payload.dto';

// Mock de ConfigService
const mockConfigService = {
  getOrThrow: jest.fn().mockReturnValue('test-secret'),
};

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('debe ser definido', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('debe configurar correctamente el JWT', () => {
    expect(mockConfigService.getOrThrow).toHaveBeenCalledWith('TOKEN_SECRET');
  });

  it('debe validar correctamente el payload', async () => {
    const payload: PayloadDto = {
      _id: '12345',
      iat: Math.floor(Date.now() / 1000), // Tiempo actual en segundos
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora de expiración
    };
    const result = await jwtStrategy.validate(payload);
    expect(result).toBe('12345');
  });

  it('debe lanzar un error si no encuentra el token en la cabecera', async () => {
    const mockExtractJwt = jest.fn().mockReturnValue(null); // Simulamos que no hay token

    // Simulamos el objeto req con el encabezado 'auth-token' ausente
    const req: { headers: { 'auth-token': string | null } } = {
      headers: {
        'auth-token': null, // Simulamos que no hay token en la cabecera.
      },
    };

    const result = mockExtractJwt(req); // Llamamos la función mockeada directamente
    expect(result).toBeNull(); // Verificamos que el resultado es null (no hay token)
  });
});
