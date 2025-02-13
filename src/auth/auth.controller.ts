import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterDataDto } from './dto/register.dto';
import { LoginDataDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() registerData: RegisterDataDto) {
    return this.authService.signUp(registerData);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginData: LoginDataDto) {
    return this.authService.signIn(loginData);
  }
}
