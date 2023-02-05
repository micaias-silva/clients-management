import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { Client, ClientSchema } from 'src/clients/schemas/client.schema';

@Module({
  imports: [
    ClientsModule,
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
      { name: Client.name, schema: ClientSchema },
    ]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
