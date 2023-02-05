import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({ timestamps: true, toObject: { virtuals: true } })
export class Contact {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

ContactSchema.virtual('id').get(function (this: ContactDocument) {
  return this._id;
});
