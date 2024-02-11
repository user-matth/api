import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { AuthRegisterDto } from '../dto/auth-register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto) {
        return this.authService.validateUser(authLoginDto);
    }

    @Post('register')
    async register(@Body() authRegisterDto: AuthRegisterDto) {
        return this.authService.registerUser(authRegisterDto);
    }

    @Delete('logout')
    logout() {
        return { message: 'Logout successful' };
    }
}
