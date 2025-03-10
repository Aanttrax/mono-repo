import { Injectable } from '@nestjs/common';
import { RegisterDataDto } from './dto/register.dto';
import { LoginDataDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUp(registerData: RegisterDataDto) {
    const newUser = await this.userModel.create(registerData);
    return newUser;
  }

  async signIn(loginData: LoginDataDto) {
    const user = await this.userModel
      .findOne({
        email: loginData.email,
      })
      .lean();
    return user;
  }
}
