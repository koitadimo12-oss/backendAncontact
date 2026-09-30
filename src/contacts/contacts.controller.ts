import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('contacts')
@ApiBearerAuth()
@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContacController{
  constructor(
    private readonly contactService: ContactsService,
  ){}

  //recuperer les contacts d un user conecter
  @Get()
  findAll(@Req() req){
    return this.contactService.findAllContacts(req.user);

  }

  //recupere un contact
  @Get(':id')
  findone(@Param('id',ParseIntPipe) id:number, @Req() req){
    return this.contactService.findContact(id,req.user);
  }

  //cree un contact
  @Post()
  create(
    @Body()createCOntactDto:CreateContactDto,
    @Req() req,
  ){
    return this.contactService.NouvelContact(
      createCOntactDto, req.user,
    );
  }
  //Modifer un contact
  @Put(':id')
  update(
    @Param('id',ParseIntPipe) id:number,
    @Body() updateContactDto:UpdateContactDto,
    @Req() req,
  ){
    this.contactService.ModifieContact(id,updateContactDto,req.user);
  }
  //supprimer un contact
  @Delete(':id')
  remove(
    @Param('id',ParseIntPipe) id:number,
    @Req() req,
  ){
    return this.contactService.supprimerContact(
      id,req.user,
    );
  }
}