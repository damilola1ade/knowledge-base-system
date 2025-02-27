<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Knowlegde Base System

Built with NestJS, Prisma, PostgreSQL, Supabase and Google Gemini LLM with a Monolithic architectural approach.

## Project setup
Clone the repository and run:

```bash
$ docker compose up
```

## Project Structure

```bash
.
├── prisma                  # Contains the database schema and migration files
├── src                     # Houses the document, google gemini and database init modules
│   ├── database            # Initialize the database and Prisma client when the project starts
│   ├── document            # Uploads the document, extract insights, queries the knowledge base system, get all documents and get single document by ID
│   └── gemini              # Initializes the Google Gemini LLM
```

## API Documentation

- Upload document and generate summary or key insights
  
  - Under Body, change Text to File and select a PDF to upload.
 
    <img width="960" alt="Screenshot 2025-01-23 122853" src="https://github.com/user-attachments/assets/16056478-c8a0-4f3c-a4f6-afdc617e1909" />


    If successful, the API endpoint returns the generated insights and document metadata.
    
    <img width="642" alt="Screenshot 2025-01-23 170235" src="https://github.com/user-attachments/assets/d6d28844-c936-48eb-afe8-7454d5b623dc" />


    The documents metadata and the extracted insights are saved in the database hosted on Supabase.
    
    <img width="960" alt="Screenshot 2025-01-23 184349" src="https://github.com/user-attachments/assets/2d8da1b9-4a7a-4af9-8f16-8e7ca55f0824" />

- Query Knowledge Base System
  -   We can provide a prompt to query the knowledge base system about an uploaded document. The AI provides intelligent responses based on the initial generated insights.
    I asked: 'Which technology is Dami strong in?' and it responded with 'Based on the provided resume, Dami is strong in TypeScript, React, React Native, and Express.js.'.


  <img width="960" alt="Screenshot 2025-01-23 180213" src="https://github.com/user-attachments/assets/c6e90c4d-5d41-4bf6-8710-d66819745ea8" />

## Database schema
I used PostgreSQL and Prisma as the ORM. The database schema is located in prisma/schema.prisma. I hosted the database on Supabase

```bash
 model Document {
  id: string
  metadata: string[]
  insights: string[]
  uploadedAt: Date
}
```
