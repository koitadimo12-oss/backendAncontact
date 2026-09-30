import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ContactsModule } from './contacts/contacts.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule ,ThrottlerGuard} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    //permet a nest de lire le fichier .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //configurer limite de requete
    ThrottlerModule.forRoot([
      {
        ttl:60000,
        limit:10,
      },
      
    ]),


//connexion a mysql
   TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_BASE_DE_DONNE'),

    ssl:
      configService.get<string>('DB_SSL') === 'true'
        ? { rejectUnauthorized: false }
        : false,

    autoLoadEntities: true,
    synchronize: false,
  }),
}),

    ContactsModule,
    UserModule,
    AuthModule,
  ],

  //active le rate limiting sur les routes
  providers :[
    {
      provide: APP_GUARD,//appliquer sur tout les routes
      useClass: ThrottlerGuard,//si ona pas depasser le nombre de requete
    },
  ],

})
export class AppModule {}