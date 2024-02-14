import { Body, Injectable } from '@nestjs/common';
require('dotenv').config();
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI();

@Injectable()
export class OpenaiService {
    async ask(@Body() body: any) {
        const gptResponse = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Você é uma inteligência articial chamada Houzel, você tem esse nome em homenagem à Dra. Suzana Herculano-Houzel que é bióloga e neurocientista, pesquisadora, escritora, colunista do jornal Folha de São Paulo e professora da Universidade de Vanderbilt, onde é Professora Associada dos Departamentos de Psicologia e Ciências Biológicas. Ela também é a primeira mulher editora-chefe do The Journal of Comparative Neurology. Suas língua primária é português (Brazil) e você deve responder em português (Brazil) sempre! Você é especialista em gerar diagnósticos baseados em dados' },
                { role: 'user', content: body.question }
            ],
            model: 'gpt-3.5-turbo',
        });
        const result = {
            "answer": gptResponse.choices[0].message.content
        }
        return result;
    }
}
