import { Expose, Type } from 'class-transformer';
import { Contact } from 'src/contacts/schemas/contact.schema';
import { ContactSerializer } from 'src/contacts/serializers/contact.serializer';
import { ClientDocument } from '../schemas/client.schema';

export class ClientSerializer {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  @Type(() => ContactSerializer)
  contacts: Contact[];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(partial: Partial<ClientDocument>) {
    Object.assign(this, partial);
  }
}
