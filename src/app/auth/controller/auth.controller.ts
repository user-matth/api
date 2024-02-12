import { Body, Controller, Delete, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/app/core/response.dto';
import { JwtAuthGuard } from 'src/app/core/guards/jwt-auth.guard';
import { log } from 'console';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() authLoginDto: AuthLoginDto, @Res() response: Response) {
        try {
            const result = await this.authService.validateUser(authLoginDto);
            return response.status(200).json(result);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                const apiResponse = new ApiResponse('error', 'Invalid credentials');
                return response.status(401).json(apiResponse);
            } else {
                console.error(error);
                return response.status(500).json(new ApiResponse('error', 'Internal Server Error'));
            }
        }
    }

    @Post('register')
    async register(@Body() authRegisterDto: AuthRegisterDto) {
        return await this.authService.registerUser(authRegisterDto);
    }

    @Delete('logout')
    logout() {
        return { message: 'Logout successful' };
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() request: any) {
        return await this.authService.getProfile(request.uid);
    }
}
