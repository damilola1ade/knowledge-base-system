// Importing necessary modules and services
import { GeminiService } from './../gemini/gemini.service';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DocumentService {
  constructor(
    private databaseService: DatabaseService,
    private geminiService: GeminiService,
  ) {}

  // Method to upload a document, extract it's content and generate key insights
  async uploadDocument(file: Express.Multer.File) {
    try {
      // Extract metadata from the uploaded file
      const metadata = {
        fileName: file.originalname,
        size: file.size,
        type: file.mimetype,
      };

      // Generate insights using the Gemini service
      const insights = await this.geminiService.extractInsights(file);

      // Store the generated insights in an array
      const insightsArray = [insights];

      // Create the document in the database with the file metadata and generated insights
      const document = await this.databaseService.document.create({
        data: { metadata, insights: insightsArray },
      });

      return {
        data: { document },
        message: 'Successful',
      };
    } catch (error) {
      throw new Error('Failed to upload document');
    }
  }

  // Method to extend the insights of an existing document based on a user prompt
  async extendInsights(documentId: string, prompt: string) {
    try {
      // Retrieve the document from the database using its ID
      const document = await this.databaseService.document.findUnique({
        where: { id: documentId },
      });

      // Throw an error if the document is not found
      if (!document) {
        throw new Error('Document not found');
      }

      // Retrieve the existing insights
      const currentInsights = Array.isArray(document.insights)
        ? document.insights
        : [];

      // Generate a new insight based on the user provided prompt and existing insights
      const newInsight = await this.geminiService.extendInsights(
        `Answer the following question: ${prompt} based on the ${currentInsights}. Just answer the question straight forward and don't repeat what is already in the ${currentInsights}. If the prompt is not related to the previous insights, tell the user.`,
      );

      // Add the new insight to the existing insights
      const updatedInsights = [...currentInsights, newInsight];

      // Update the document in the database with the new insights
      await this.databaseService.document.update({
        where: { id: document.id },
        data: { insights: updatedInsights },
      });

      // Return the newly generated insight as a response
      return { insights: newInsight, message: 'Successful' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to extend insights');
    }
  }

  // Method to retrieve metadata of all documents in the database
  async getAllDocuments() {
    try {
      // Fetch all documents from the database
      const documents = await this.databaseService.document.findMany();

      return documents;
    } catch (error) {
      throw new Error('Failed to get metadata');
    }
  }

  // Method to retrieve a document by its ID
  async getDocument(documentId: string) {
    try {
      // Fetch the document from the database using its ID
      const document = await this.databaseService.document.findUnique({
        where: { id: documentId },
      });

      // Throw an error if the document is not found
      if (!document) {
        throw new Error('Chat not found');
      }

      return document;
    } catch (error) {
      throw new Error('Failed to get metadata');
    }
  }
}
