import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    // Retrieve the API key from environment variables using the ConfigService
    const apiKey = this.configService.getOrThrow('GOOGLE_API_KEY');

    // Initialize the Google Generative AI client with the API key
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  // Method to extract initial insights from an uploaded document
  async extractInsights(file: Express.Multer.File): Promise<string> {
    try {
      // Retrieve the google model to be used for generating content
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
      });

      // Extract key insights from the uploaded document
      const result = await model.generateContent([
        {
          inlineData: {
            data: file.buffer.toString('base64'),
            mimeType: 'application/pdf',
          },
        },
        'Extract key insights',
      ]);

      // Return the text response from the generated content
      return result.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to extract insights');
    }
  }

  // Method to generate more insights from already existing document insights
  async extendInsights(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
      });

      // Generate more insights using the provided prompt
      const result = await model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate insights');
    }
  }
}
