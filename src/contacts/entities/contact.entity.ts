import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn, 
  Unique,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Unique(['user', 'telephone'])
@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  telephone: string;

  @Column({ default: false })
  favori: boolean;

  // Plusieurs contacts peuvent appartenir à un utilisateur
  @ManyToOne(() => User, user => user.contacts, {
    onDelete: 'CASCADE',
  })
  user: User;
}