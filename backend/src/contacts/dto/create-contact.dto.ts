import { Type } from 'class-transformer';
import { IsDefined, IsEmail, IsPhoneNumber, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsDefined()
  @MaxLength(128)
  name: string;

  @IsEmail()
  @IsDefined()
  @Type(() => String)
  email: string;

  @IsPhoneNumber('BR')
  phoneNumber: string;
}
