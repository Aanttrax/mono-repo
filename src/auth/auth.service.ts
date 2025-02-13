import { Injectable } from '@nestjs/common';
import { RegisterDataDto } from './dto/register.dto';
import { LoginDataDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async signUp(registerData: RegisterDataDto) {
    await console.log(registerData);
    return 'Sign up';
  }

  async signIn(loginData: LoginDataDto) {
    console.log(loginData);
    return 'Sign in';
  }
}
