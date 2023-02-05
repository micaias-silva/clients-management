import { Expose, Type } from 'class-transformer';
import { ContactDocument } from '../schemas/contact.schema';

export class ContactSerializer {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(partial: Partial<ContactDocument>) {
    Object.assign(this, partial);
  }
}
