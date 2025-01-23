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

  // POST endpoint to handle file uploads
  @Post('upload')
  // Use the FileInterceptor to handle file uploads, 'file' is the field name in the form-data
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.documentService.uploadDocument(file);
  }

  // PATCH endpoint to extend insights for a specific document
  @Patch('extend-insights/:documentId')
  async extendInsights(
    @Param('documentId') documentId: string, // Extract the documentId from the URL parameters
    @Body('prompt') prompt: string, // Extract the prompt from the request body
  ) {
    return this.documentService.extendInsights(documentId, prompt);
  }

  // GET endpoint to retrieve all documents
  @Get('get-documents')
  async getAllDocuments() {
    return this.documentService.getAllDocuments();
  }

  // GET endpoint to retrieve a specific document by its ID
  @Get('get-document/:documentId')
  async getDocument(@Param('documentId') documentId: string) {
    return this.documentService.getDocument(documentId);
  }
}