import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Contact } from 'src/contacts/schemas/contact.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'Contacts' })
  contacts: Contact[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
