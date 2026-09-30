import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { User } from 'src/user/entities/user.entity';
import { use } from 'passport';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  // Récupérer les contacts d'un utilisateur connecté
  async findAllContacts(user: User) {
    return this.contactRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  // Récupérer un contact d'un utilisateur
  async findContact(id: number, user: User) {
    const contact = await this.contactRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (!contact) {
      throw new NotFoundException('Contact non trouvé');
    }

    return contact;
  }

  // Créer un contact pour l'utilisateur connecté
  async NouvelContact(createContactDto: CreateContactDto, user: User)
   {
    // verifier si ce num existe deja chez cet user
    const contactExistant= await this.contactRepository.findOne({
      where:{
       telephone: createContactDto.telephone,
       user:{
        id: user.id,
       },
      },
    });

    if(contactExistant){
      throw new ConflictException('ce numero existe deja dans vos contacts');
    };

    // cree le contact
    const contact = this.contactRepository.create({
      ...createContactDto,
      user,
    });

    return this.contactRepository.save(contact);
  }

  // Modifier un contact d'un utilisateur
  async ModifieContact(
    id: number,
    updateContactDto: UpdateContactDto,
    user: User,
  ) {
    const contact = await this.findContact(id, user);

    //verifie le num uniquement s'il est modier
    if(updateContactDto.telephone){
      const contactExist = await this.contactRepository.findOne({
        where:{
          telephone: updateContactDto.telephone,
          user:{
            id: user.id,
          },
        },
      });

      //verifie que ce n est pas le contact lui meme
      if(contactExist && contactExist.id !== id){
        throw new ConflictException('Ce numero existe deja dans vos contact',);
      }
    }
    
    //modifie le contact
    Object.assign(contact, updateContactDto);

    return this.contactRepository.save(contact);
  }

  // Supprimer le contact d'un utilisateur
  async supprimerContact(id: number, user: User) {
    const contact = await this.findContact(id, user);

    await this.contactRepository.remove(contact);

    return {
      message: 'Contact supprimé avec succès',
    };
  }
}