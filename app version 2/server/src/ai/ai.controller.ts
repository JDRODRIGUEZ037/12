import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('generate-copy')
  @HttpCode(HttpStatus.OK)
  async generateCopy(
    @Body('prompt') prompt: string,
    @Body('tone') tone: string,
  ) {
    if (!prompt) {
      return {
        success: false,
        error: 'El campo "prompt" es requerido.',
      };
    }
    const copy = await this.aiService.generateCopy(prompt, tone || 'profesional');
    return {
      success: true,
      copy,
    };
  }

  @Post('generate-image')
  @HttpCode(HttpStatus.OK)
  async generateImage(@Body('prompt') prompt: string) {
    if (!prompt) {
      return {
        success: false,
        error: 'El campo "prompt" es requerido para generar la imagen.',
      };
    }
    const imageUrl = await this.aiService.generateImage(prompt);
    return {
      success: true,
      imageUrl,
    };
  }
}
