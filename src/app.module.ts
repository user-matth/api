import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './app/core/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './app/openai/openai.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    JwtModule.register({
      secret: 'MILLENIUM',
      signOptions: { expiresIn: '1h' },
    }),
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    JwtAuthGuard
  ],
})
export class AppModule {}
