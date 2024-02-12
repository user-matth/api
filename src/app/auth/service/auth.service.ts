import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import * as jwt from 'jsonwebtoken';
import { ApiResponse } from 'src/app/core/response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private readonly configService: ConfigService
  ) { }

  async validateUser(authLoginDto: AuthLoginDto): Promise<any> {
    try {
      const { email, password } = authLoginDto;
      const user = await this.prisma.user.findUnique({ where: { email } });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const existingToken = await this.prisma.token.findFirst({
          where: {
            userId: user.id,
          },
        });
  
        let token: string;
  
        if (existingToken) {
          token = this.generateToken(user);

          await this.prisma.token.update({
            where: {
              id: existingToken.id,
            },
            data: {
              token,
            },
          });
        } else {
          token = this.generateToken(user);
  
          await this.prisma.token.create({
            data: {
              token,
              userId: user.id,
            },
          });
        }
  
        return new ApiResponse('success', 'Login successful', { token });
      }
  
      throw new UnauthorizedException('Invalid credentials');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new Error('Internal Server Error');
      }
    }
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
    return new ApiResponse('success', 'User registered successfully', { user: result });
  }

  async getProfile(uid: string) {
    const user = await this.prisma.user.findUnique({ where: { email: uid } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password: _, ...result } = user;
    return new ApiResponse('success', 'User profile retrieved', { user: result });
  }

  private generateToken(user: any): string {
    const payload: jwt.JwtPayload = { userId: user.id, email: user.email };
    return jwt.sign(payload, this.configService.get<string>('JWT_SECRET'), { expiresIn: '1h' });
  }

}
