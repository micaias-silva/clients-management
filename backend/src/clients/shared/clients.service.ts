import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client, ClientDocument } from '../schemas/client.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<ClientDocument>,
  ) {}

  async create(clientData: CreateClientDto) {
    const hashedPassword = await hash(clientData.password, 10);
    clientData.password = hashedPassword;
    return await this.clientModel.create(clientData);
  }

  async findAll() {
    return await this.clientModel.find().populate('contacts');
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id).populate('contacts');

    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }

  async findOneByEmail(email: string) {
    const client = await this.clientModel.findOne({ email });

    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }

  async update(id: string, clientUpdateData: UpdateClientDto) {
    if (clientUpdateData.password) {
      const hashedPassword = await hash(clientUpdateData.password, 10);
      clientUpdateData.password = hashedPassword;
    }
    await this.findOne(id);
    await this.clientModel.updateOne({ _id: id }, clientUpdateData);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.clientModel.remove({ _id: id });
  }
}
