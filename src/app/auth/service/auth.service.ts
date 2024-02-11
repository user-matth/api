import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { AuthRegisterDto } from '../dto/auth-register.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaClient) {}

    async validateUser(authLoginDto: AuthLoginDto): Promise<any> {
        const { email, password } = authLoginDto;
    
        const user = await this.prisma.user.findUnique({ where: { email } });
    
        if (user && await bcrypt.compare(password, user.password)) {
          const { password: _, ...result } = user;
          return result;
        }
    
        throw new UnauthorizedException('Invalid credentials');
    }

    async registerUser(authRegisterDto: AuthRegisterDto): Promise<any> {
        const { name, email, password } = authRegisterDto;
    
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          throw new ConflictException('Email is already in use');
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = await this.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
    
        const { password: _, ...result } = newUser;
        return result;
      }
}
