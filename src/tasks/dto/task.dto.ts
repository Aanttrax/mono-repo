import { IsBoolean, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly done: boolean;
}
