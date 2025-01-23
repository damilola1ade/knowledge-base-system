import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // Decorator to make the module accessible globally
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
