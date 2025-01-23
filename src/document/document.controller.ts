import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAndSummarizeDocument(@UploadedFile() file: Express.Multer.File) {
    return this.documentService.uploadAndSummarizeDocument(file);
  }

  @Patch('extend-insights/:documentId')
  async extendInsights(
    @Param('documentId') documentId: string,
    @Body('prompt') prompt: string,
  ) {
    return this.documentService.extendInsights(documentId, prompt);
  }

  @Get('get-metadata')
  async getMetadata() {
    return this.documentService.getMetadata();
  }

  @Get('get-unique-chat/:documentId')
  async getUniqueChat(@Param('documentId') documentId: string) {
    return this.documentService.getUniqueChat(documentId);
  }
}
