import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
