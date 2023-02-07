import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientsService } from 'src/clients/shared/clients.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    private clientsService: ClientsService,
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(clientId: string, contactData: CreateContactDto) {
    const client = await this.clientsService.findOne(clientId);
    const contact = await this.contactModel.create({
      ...contactData,
    });
    if (!client.contacts) {
      client.contacts = [];
    }
    client.contacts.push(contact);
    await client.save();
    return contact;
  }

  async findAll(clientId: string) {
    const client = await this.clientsService.findOne(clientId);
    return client.contacts;
  }

  async findOne(clientId: string, contactId: string) {
    const client = await this.clientsService.findOne(clientId);

    const contactExists = client.contacts?.some((contact) => {
      return contact._id.toString() === contactId;
    });

    if (!contactExists) {
      throw new NotFoundException();
    }

    const contact = this.contactModel.findOne({ _id: contactId });
    return contact;
  }

  async update(
    clientId: string,
    contactId: string,
    contactUpdateData: UpdateContactDto,
  ) {
    const contact = await this.findOne(clientId, contactId);
    await contact?.update(contactUpdateData);
  }

  async remove(clientId: string, contactId: string) {
    const contact = await this.findOne(clientId, contactId);
    await contact?.remove();
  }
}
