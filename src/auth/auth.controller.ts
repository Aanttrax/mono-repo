import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDataDto } from './dto/register.dto';
import { LoginDataDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { EncryptService } from 'src/shared/services/encrypt.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private encryptService: EncryptService,
  ) {}
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() registerData: RegisterDataDto) {
    const { password } = registerData;
    const hash = await this.encryptService.encryptPassword(password);
    registerData.password = hash;
    const id = await this.authService.signUp(registerData);
    console.log(id, '***');
    return;
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginData: LoginDataDto) {
    return this.authService.signIn(loginData);
  }
}
