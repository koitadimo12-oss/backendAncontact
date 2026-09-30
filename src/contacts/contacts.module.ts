import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactsService } from './contacts.service';
import { ContacController } from './contacts.controller';
import { Contact } from './entities/contact.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
  ],
  controllers: [ContacController],
  providers: [ContactsService],
})
export class ContactsModule {}