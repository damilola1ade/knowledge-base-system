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
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.documentService.uploadDocument(file);
  }

  @Patch('extend-insights/:documentId')
  async extendInsights(
    @Param('documentId') documentId: string,
    @Body('prompt') prompt: string,
  ) {
    return this.documentService.extendInsights(documentId, prompt);
  }

  @Get('get-documents')
  async getAllDocuments() {
    return this.documentService.getAllDocuments();
  }

  @Get('get-document/:documentId')
  async getDocument(@Param('documentId') documentId: string) {
    return this.documentService.getDocument(documentId);
  }
}
