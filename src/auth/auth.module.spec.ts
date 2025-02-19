import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EncryptService } from '../shared/services/encrypt.service';
import { JwtStrategy } from './jwt.strategy';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/auth.schema';

const mockUserModel = {
  find: jest.fn().mockResolvedValue([]),
};

describe('AuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1d' },
        }),
        PassportModule,
      ],
      providers: [
        AuthService,
        AuthController,
        EncryptService,
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: { getOrThrow: jest.fn().mockReturnValue('test-secret') },
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();
  });

  it('Debe compilarse correctamente', async () => {
    expect(module).toBeDefined();
  });

  it('Debe contener el AuthService', async () => {
    const authService = module.get<AuthService>(AuthService);
    expect(authService).toBeDefined();
  });

  it('Debe contener el AuthController', async () => {
    const authController = module.get<AuthController>(AuthController);
    expect(authController).toBeDefined();
  });

  it('Debe contener el EncryptService', async () => {
    const encryptService = module.get<EncryptService>(EncryptService);
    expect(encryptService).toBeDefined();
  });

  it('Debe contener el JwtStrategy', async () => {
    const jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    expect(jwtStrategy).toBeDefined();
  });
});
