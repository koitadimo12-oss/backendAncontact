import 'dotenv/config';

import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Contact } from './contacts/entities/contact.entity';

export default new DataSource({
    type:'mysql',
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_BASE_DE_DONNE,

    entities:[User,Contact],
    migrations:['src/migrations/*.ts'],
});