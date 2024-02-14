import { Module } from '@nestjs/common';
import { OpenaiController } from './controller/openai.controller';
import { OpenaiService } from './service/openai.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, JwtService]
})
export class OpenaiModule {}
