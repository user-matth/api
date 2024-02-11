import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { PrismaClient } from '@prisma/client';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, PrismaClient],
})
export class AuthModule {}
