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
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto, @Req() req: Request) {
    if (req.user) {
      return this.contactsService.create(req.user.sub, createContactDto);
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    if (req.user) {
      return this.contactsService.findAll(req.user?.sub);
    }
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    if (req.user) {
      return this.contactsService.findOne(req.user.sub, id);
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
