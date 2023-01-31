import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './contacts/clients/clients.module';
import { ContactsModule } from './contacts/contacts.module';
import { ClientsModule } from './clients/clients.module';
import { ContactsModule } from './contacts/contacts.module';
import { ClientsModule } from './clients/clients.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [ClientsModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
