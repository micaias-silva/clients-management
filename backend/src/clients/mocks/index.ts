import { CreateClientDto } from '../dto/create-client.dto';

export const createClientRequest: CreateClientDto = {
  name: 'Mocked Client Name',
  email: 'mocked@clientdomain.com',
  password: 'mockedpassword',
  phoneNumber: '(12) 934567890',
};
