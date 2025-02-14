import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDataDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}
