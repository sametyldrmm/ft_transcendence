import { IsNotEmpty, IsString } from 'class-validator';

export class CheckLoginDto {
  @IsNotEmpty()
  @IsString()
  login: string;
}
