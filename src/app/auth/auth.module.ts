import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MailerServices } from '../core/mailer/mailer.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        PrismaClient, 
        JwtService,
        MailerServices
    ],
})
export class AuthModule {}
