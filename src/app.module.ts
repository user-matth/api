import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './app/core/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './app/openai/openai.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerServices } from './app/core/mailer/mailer.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    JwtModule.register({
      secret: 'MILLENIUM',
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    JwtAuthGuard, 
    MailerServices
  ],
})
export class AppModule {}
