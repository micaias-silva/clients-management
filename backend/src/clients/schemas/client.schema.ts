import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Contact } from 'src/contacts/schemas/contact.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Contact' }],
  })
  contacts?: Contact[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
