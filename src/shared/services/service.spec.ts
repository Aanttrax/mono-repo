import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let service: EncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    service = module.get<EncryptService>(EncryptService);
  });

  it('Debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('Debe encriptar una contraseña', async () => {
    const password = 'testPassword';
    const hash = await service.encryptPassword(password);

    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
    expect(hash).not.toBe(password);
  });

  it('Debe comparar contraseñas correctamente', async () => {
    const password = 'testPassword';
    const hash = await service.encryptPassword(password);
    const isMatch = await service.comparePasswords(password, hash);

    expect(isMatch).toBe(true);
  });

  it('Debe fallar con una contraseña incorrecta', async () => {
    const password = 'testPassword';
    const wrongPassword = 'wrongPassword';
    const hash = await service.encryptPassword(password);
    const isMatch = await service.comparePasswords(wrongPassword, hash);

    expect(isMatch).toBe(false);
  });
});
