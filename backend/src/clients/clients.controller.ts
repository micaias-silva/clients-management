import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { ClientsService } from './shared/clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientSerializer } from './serializers/client.serializer';

@Controller('clients')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const client = await this.clientsService.create(createClientDto);
    return new ClientSerializer(client.toObject());
  }

  @Get()
  async findAll() {
    const clients = await (
      await this.clientsService.findAll()
    ).map((client) => new ClientSerializer(client.toObject()));
    return clients;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientsService.findOne(id);
    return new ClientSerializer(client.toObject());
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
