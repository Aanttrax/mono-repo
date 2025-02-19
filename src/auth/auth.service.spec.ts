import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { RegisterDataDto } from './dto/register.dto';
import { LoginDataDto } from './dto/login.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn().mockReturnThis(), // Simulación de findOne()
            lean: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('Debe estar definido', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('Debe crear un usuario y retornarlo', async () => {
      const mockUser = { email: 'test@test.com', password: 'hashedpass' } as User;
      const registerDto: RegisterDataDto = {
        userName: 'test',
        password: 'password',
        name: 'pepe',
        lastName: 'perez',
        email: 'test@test.com',
      };

      (userModel.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.signUp(registerDto);
      expect(result).toEqual(mockUser);
      expect(userModel.create).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('signIn', () => {
    it('Debe encontrar un usuario por email', async () => {
      const mockUser: User = {
        userName: 'test',
        password: 'hashedpass',
        name: 'pepe',
        lastName: 'perez',
        email: 'test@test.com',
      };
      const loginDto: LoginDataDto = { email: 'test@test.com', password: 'password' };

      (userModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await authService.signIn(loginDto);
      expect(result).toEqual(mockUser);
      expect(userModel.findOne).toHaveBeenCalledWith({ email: loginDto.email });
    });

    it('Debe retornar null si el usuario no existe', async () => {
      const loginDto: LoginDataDto = { email: 'notfound@test.com', password: 'password' };

      (userModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      const result = await authService.signIn(loginDto);
      expect(result).toBeNull();
      expect(userModel.findOne).toHaveBeenCalledWith({ email: loginDto.email });
    });
  });
});
