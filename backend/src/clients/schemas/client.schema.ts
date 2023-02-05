import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ContactDocument } from 'src/contacts/schemas/contact.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ timestamps: true, toObject: { virtuals: true } })
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Contact' }],
  })
  contacts?: ContactDocument[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);

ClientSchema.virtual('id').get(function (this: ClientDocument) {
  return this._id.toString();
});
