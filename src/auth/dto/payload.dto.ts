import { IsNumber, IsString } from 'class-validator';

export class PayloadDto {
  @IsString()
  readonly _id: string;

  @IsNumber()
  readonly iat: number;

  @IsNumber()
  readonly exp: number;
}
