import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OpenaiService } from '../service/openai.service';
import { JwtAuthGuard } from 'src/app/core/guards/jwt-auth.guard';

@Controller('v1/chat')
export class OpenaiController {
    constructor(
        private openaiService: OpenaiService
    ) { }

    @Post('ask')
    @UseGuards(JwtAuthGuard)
    async ask(@Body() body: any){
        return await this.openaiService.ask(body);
    }
}
