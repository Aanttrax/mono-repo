import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  private readonly saltRounds = 10;

  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
