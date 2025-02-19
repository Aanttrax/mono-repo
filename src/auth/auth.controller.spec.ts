import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EncryptService } from '../shared/services/encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDataDto } from './dto/register.dto';
import { LoginDataDto } from './dto/login.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let encryptService: EncryptService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
        {
          provide: EncryptService,
          useValue: {
            encryptPassword: jest.fn(),
            comparePasswords: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    encryptService = module.get<EncryptService>(EncryptService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signUp', () => {
    it('Debe registrar un usuario y retornar éxito', async () => {
      const registerDto: RegisterDataDto = {
        userName: 'testuser',
        password: '123456',
        name: 'Pepe',
        lastName: 'Pérez',
        email: 'test@example.com',
      };

      const mockUser = { _id: { toHexString: () => '1' } };
      const mockToken = 'mockedToken';

      (encryptService.encryptPassword as jest.Mock).mockResolvedValue('hashedpass');
      (authService.signUp as jest.Mock).mockResolvedValue(mockUser);
      (jwtService.sign as jest.Mock).mockReturnValue(mockToken);

      const res = {
        setHeader: jest.fn(),
        json: jest.fn(),
      };

      await authController.signUp(registerDto, res as unknown as Response);

      expect(encryptService.encryptPassword).toHaveBeenCalledWith(registerDto.password);
      expect(authService.signUp).toHaveBeenCalledWith({ ...registerDto, password: 'hashedpass' });
      expect(jwtService.sign).toHaveBeenCalledWith({ _id: '1' });
      expect(res.setHeader).toHaveBeenCalledWith('auth-token', mockToken);
      expect(res.json).toHaveBeenCalledWith({ success: true, response: 'User Created' });
    });
  });

  describe('signIn', () => {
    it('Debe loguear un usuario correctamente', async () => {
      const loginDto: LoginDataDto = { email: 'test@example.com', password: '123456' };

      const mockUser = {
        _id: { toHexString: () => '1' },
        password: 'hashedpass',
      };
      const mockToken = 'mockedToken';

      (authService.signIn as jest.Mock).mockResolvedValue(mockUser);
      (encryptService.comparePasswords as jest.Mock).mockResolvedValue(true);
      (jwtService.sign as jest.Mock).mockReturnValue(mockToken);

      const res = {
        setHeader: jest.fn(),
        json: jest.fn(),
      };

      await authController.signIn(loginDto, res as unknown as Response);

      expect(authService.signIn).toHaveBeenCalledWith(loginDto);
      expect(encryptService.comparePasswords).toHaveBeenCalledWith(loginDto.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ _id: '1' });
      expect(res.setHeader).toHaveBeenCalledWith('auth-token', mockToken);
      expect(res.json).toHaveBeenCalledWith({ success: true, response: 'Logged-in User' });
    });

    it('Debe lanzar error si el usuario no existe', async () => {
      const loginDto: LoginDataDto = { email: 'test@example.com', password: '123456' };

      (authService.signIn as jest.Mock).mockResolvedValue(null);

      await expect(authController.signIn(loginDto, {} as unknown as Response)).rejects.toThrow(
        new NotFoundException('Email not found'),
      );
    });

    it('Debe lanzar error si la contraseña es incorrecta', async () => {
      const loginDto: LoginDataDto = { email: 'test@example.com', password: 'wrongpassword' };

      const mockUser = {
        _id: { toHexString: () => '1' },
        password: 'hashedpass',
      };

      (authService.signIn as jest.Mock).mockResolvedValue(mockUser);
      (encryptService.comparePasswords as jest.Mock).mockResolvedValue(false);

      await expect(authController.signIn(loginDto, {} as unknown as Response)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials'),
      );
    });
  });
});
