import { Module } from '@nestjs/common';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ContactsModule } from './contacts/contacts.module';
import { AuthModule } from './auth/auth.module';

const DATABASE_URL = process.env.DATABASE_URL as string;

@Module({
  imports: [
    ClientsModule,
    ContactsModule,
    MongooseModule.forRoot(DATABASE_URL, {
      authSource: 'admin',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
