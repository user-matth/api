import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { log } from 'console';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            const decodedToken = await this.jwtService.decode(token);
            if (!decodedToken) {
                throw new UnauthorizedException('Token not provided');
            }
            request.uid = decodedToken.email;
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token expired');
            } else if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Invalid token');
            } else {
                throw new UnauthorizedException(`Token validation error: ${error.message}`);
            }
        }
    }
}
