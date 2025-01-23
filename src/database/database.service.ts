import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  // Lifecycle hook that runs when the module is initialized
  async onModuleInit() {
    // Establish a connection to the database using Prisma's $connect method
    await this.$connect();
  }
}
