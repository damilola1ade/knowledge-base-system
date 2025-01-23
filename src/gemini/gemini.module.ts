import { Global, Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Global() // Decorator to make the module accessible globally
@Module({
  providers: [GeminiService],
  exports: [GeminiService],
})
export class GeminiModule {}
