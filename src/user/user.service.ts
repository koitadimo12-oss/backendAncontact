import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(userData: Partial<User>):Promise<User>{
    //preapre puis enregistre un user
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

async findByEmail(email:string):Promise<User | null>{
  //chercher un user sans expose le mot de pass
  return this.userRepository.findOneBy({email});
}

async findByEmailAvecPassword(email:string,): Promise<User | null>{
  // utuliser uniquement pour verifier le mot de pass
  return this.userRepository
  .createQueryBuilder('user')
  .addSelect('user.password')
  .where('user.email = :email', {email})
  .getOne();
}

async findById(id:number) : Promise<User | null>{
  //chercher un user avec son id
  return this.userRepository.findOneBy({id});
}

 
}