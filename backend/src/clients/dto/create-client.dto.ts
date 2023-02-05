import { IsDefined, IsEmail, IsPhoneNumber, MaxLength } from 'class-validator';

export class CreateClientDto {
  @IsDefined()
  @MaxLength(128)
  name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsPhoneNumber('BR')
  phoneNumber: string;

  @IsDefined()
  password: string;
}
