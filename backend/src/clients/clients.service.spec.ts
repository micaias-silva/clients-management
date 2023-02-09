import { Test, TestingModule } from '@nestjs/testing';
import { createClientRequest } from './mocks';
import { ClientsService } from './shared/clients.service';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('create -> Should be able to create a client', async () => {
    const client = await service.create(createClientRequest);

    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('name');
    expect(client).toHaveProperty('email');
    expect(client).toHaveProperty('createdAt');
    expect(client).toHaveProperty('updatedAt');
    expect(client).toHaveProperty('contacts');
    expect(client.contacts).toHaveLength(0);
    expect(client).not.toHaveProperty('password');
  });

  test('findAll -> Should be able to list every client data', async () => {
    const clientList = await service.findAll();
    const client = clientList[0];

    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('name');
    expect(client).toHaveProperty('email');
    expect(client).toHaveProperty('createdAt');
    expect(client).toHaveProperty('updatedAt');
    expect(client).toHaveProperty('contacts');
    expect(client.contacts).toHaveLength(0);
    expect(client).not.toHaveProperty('password');
  });

  test("findOne -> Should be able to list one client's data", async () => {
    const clientList = await service.findAll();
    const client = await service.findOne(clientList[0]._id.toString());

    expect(client).toHaveProperty('id');
    expect(client).toHaveProperty('name');
    expect(client).toHaveProperty('email');
    expect(client).toHaveProperty('createdAt');
    expect(client).toHaveProperty('updatedAt');
    expect(client).toHaveProperty('contacts');
    expect(client.contacts).toHaveLength(0);
    expect(client).not.toHaveProperty('password');
  });

  // test('update -> Should be able to update all clients data', async () => {});
});
