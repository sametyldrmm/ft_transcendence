import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  login: string;

  @IsOptional()
  @IsBooleanString()
  twoFA: boolean;

  //Path of avatar image
  @IsOptional()
  @IsString()
  avatar: string;
}
