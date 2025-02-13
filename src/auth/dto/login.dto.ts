import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDataDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
