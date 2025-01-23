<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Knowlegde Base System

Built with NestJS, Prisma, PostgreSQL, Supabase and Google Gemini LLM

## Project setup

```bash
$ npm install
```

## Dockerize and run the project

```bash
$ docker compose up
```

## Postman Results

- Upload document, extract content and generate summary or key insights
  
  - Under Body, change Text to File and select a PDF to upload.
 
    <img width="960" alt="Screenshot 2025-01-23 122853" src="https://github.com/user-attachments/assets/16056478-c8a0-4f3c-a4f6-afdc617e1909" />


    If successful, the API endpoint returns the created document.
    
    <img width="642" alt="Screenshot 2025-01-23 170235" src="https://github.com/user-attachments/assets/d6d28844-c936-48eb-afe8-7454d5b623dc" />


    The documents metadata and the extracted insights are saved in the database hosted on Supabase.
    
    <img width="960" alt="Screenshot 2025-01-23 123348" src="https://github.com/user-attachments/assets/950978b7-36db-4f60-99b2-a214623374f4" />

- Query Knowledge Base System
  -   We can provide a prompt to query the knowledge base system about an uploaded document. The AI provides intelligent responses based on the initial generated insights.
    I asked: 'How many years experience does have Dami have?' and it responded with '5 years'.

  <img width="960" alt="Screenshot 2025-01-23 170359" src="https://github.com/user-attachments/assets/8e6be62e-de23-49d2-b91d-adf2cf5975a7" />



- Get unique document
  -   The API endpoint gets a document by ID and returns everything about the document. These include the extracted content, metadata, the generated insights and the           datetime the document was uploaded.
    
<img width="960" alt="Screenshot 2025-01-23 123607" src="https://github.com/user-attachments/assets/f1e751d1-25ef-44a9-8b49-54f7aaefaf09" />

- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
