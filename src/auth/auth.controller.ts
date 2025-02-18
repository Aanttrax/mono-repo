import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterDataDto } from './dto/register.dto';
import { LoginDataDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { EncryptService } from '../shared/services/encrypt.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private encryptService: EncryptService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() registerData: RegisterDataDto, @Res() res: Response) {
    const { password, ...rest } = registerData;

    const hash = await this.encryptService.encryptPassword(password);
    const { _id } = await this.authService.signUp({ password: hash, ...rest });

    const token = this.jwtService.sign({ _id: _id.toHexString() });
    res.setHeader('auth-token', token);
    return res.json({ success: true, response: 'User Created' });
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginData: LoginDataDto, @Res() res: Response) {
    const user = await this.authService.signIn(loginData);
    if (!user) throw new NotFoundException('Email not found');

    const isPasswordValid = await this.encryptService.comparePasswords(loginData.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ _id: user._id.toHexString() });
    res.setHeader('auth-token', token);
    return res.json({ success: true, response: 'Logged-in User' });
  }
}
