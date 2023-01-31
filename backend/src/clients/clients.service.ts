import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(clientData: CreateClientDto) {
    return await this.clientModel.create(clientData);
  }

  async findAll() {
    return await this.clientModel.find();
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id).populate('contacts');

    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }

  async update(id: string, clientUpdateData: UpdateClientDto) {
    const client = await this.findOne(id);

    await client.update(clientUpdateData);
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    await client.remove();
  }
}
