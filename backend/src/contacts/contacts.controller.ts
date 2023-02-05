/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactDocument } from './schemas/contact.schema';
import { ContactSerializer } from './serializers/contact.serializer';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
    @Req() req: Request,
  ) {
    if (req.user) {
      const contact = await this.contactsService.create(
        req.user.sub,
        createContactDto,
      );
      return new ContactSerializer(contact.toObject());
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    if (req.user) {
      const contacts = await this.contactsService.findAll(req.user?.sub);
      if (contacts) {
        return contacts.map(
          (contact: ContactDocument) =>
            new ContactSerializer(contact.toObject()),
        );
      }
    }
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    if (req.user) {
      const contact = await this.contactsService.findOne(req.user.sub, id);
      return new ContactSerializer(contact!.toObject());
    }
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    if (req.user) {
      return this.contactsService.update(req.user.sub, id, updateContactDto);
    }
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    if (req.user) {
      return this.contactsService.remove(req.user.sub, id);
    }
  }
}
