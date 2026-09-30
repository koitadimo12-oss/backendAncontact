import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Contact } from '../../contacts/entities/contact.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column({select: false})//le mot de pass n est pas selectioner par defaut
  password: string;

  // Un utilisateur peut avoir plusieurs contacts
  @OneToMany(() => Contact, contact => contact.user)
  contacts: Contact[];
}