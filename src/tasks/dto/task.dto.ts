import { IsBoolean, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
