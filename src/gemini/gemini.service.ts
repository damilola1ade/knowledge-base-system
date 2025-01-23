// Importing necessary modules and services
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI; // Instance of Google Generative AI

  constructor(private readonly configService: ConfigService) {
    // Retrieve the API key from environment variables using the ConfigService
    const apiKey = this.configService.getOrThrow('GOOGLE_API_KEY');

    // Initialize the Google Generative AI client with the API key
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  // Method to create a chat response based on a given prompt
  async createChat(prompt: string): Promise<string> {
    try {
      // Retrieve the google model to be used for generating content
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
      });

      // Generate content using the provided prompt
      const result = await model.generateContent(prompt);

      // Return the text response from the generated content
      return result.response.text();
    } catch (error) {
      // Log the error to the console for debugging purposes
      console.error('Error generating content:', error);

      // Throw a new error to inform the user of the failure
      throw new Error('Failed to generate content');
    }
  }
}
