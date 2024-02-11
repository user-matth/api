// auth/dto/auth-register.dto.ts
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
