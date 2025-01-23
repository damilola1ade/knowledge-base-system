// Importing necessary modules and services
import { GeminiService } from './../gemini/gemini.service';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { extractTextFromPDF } from 'src/utils';

@Injectable()
export class DocumentService {
  constructor(
    private databaseService: DatabaseService,
    private geminiService: GeminiService,
  ) {}

  // Method to upload a document, extract it's content and generate a summary or key insights
  async uploadAndSummarizeDocument(file: Express.Multer.File) {
    try {
      // Extract metadata from the uploaded file
      const metadata = {
        fileName: file.originalname,
        size: file.size,
        type: file.mimetype,
      };

      // Extract text content from the uploaded PDF file
      const content = await extractTextFromPDF(file.buffer);

      // Save the document content and metadata in the database
      const document = await this.databaseService.document.create({
        data: {
          content,
          metadata,
        },
      });

      // Generate insights using the Gemini service
      const insight = await this.geminiService.createChat(
        `Extract summaries or key insights in 2 paragraphs. Pay attentive to necessary information and please do not hallucinate: ${content}`,
      );

      // Store the generated insights in an array
      const insightsArray = [insight];

      // Update the document in the database with the generated insights
      await this.databaseService.document.update({
        where: { id: document.id },
        data: { insights: insightsArray },
      });

      // Return the insights and document ID as a response
      return {
        data: { insight, id: document.id },
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

      // Generate a new insight based on the user-provided prompt and existing insights
      const newInsight = await this.geminiService.createChat(
        `Answer the following question: ${prompt} based on these ${currentInsights}. Just answer the question straight forward and don't repeat what is already in the ${currentInsights}. If the prompt is not related to the previous insights, tell the user.`,
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
  async getMetadata() {
    try {
      // Fetch all documents from the database
      const documents = await this.databaseService.document.findMany();

      // Map the documents to return only their ID and metadata
      return documents.map((document) => ({
        id: document.id,
        metadata: document.metadata,
      }));
    } catch (error) {
      throw new Error('Failed to get metadata');
    }
  }

  // Method to retrieve a specific document/chat by its ID
  async getUniqueChat(documentId: string) {
    try {
      // Fetch the document from the database using its ID
      const chat = await this.databaseService.document.findUnique({
        where: { id: documentId },
      });

      // Throw an error if the document/chat is not found
      if (!chat) {
        throw new Error('Chat not found');
      }

      // Return the retrieved document/chat
      return chat;
    } catch (error) {
      throw new Error('Failed to get metadata');
    }
  }
}
