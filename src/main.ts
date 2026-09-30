import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import{ DocumentBuilder,SwaggerModule} from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/htpp-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //active le filtre erreur pour toute l api
  app.useGlobalFilters(new HttpExceptionFilter());

  //Active la validation des Dto
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,

  }),
);
//configuration de swagger
const config = new DocumentBuilder()
.setTitle('An-contact API')
.setDescription('API backend de l application An-contact')
.setVersion('1.0')
.addBearerAuth()
.build();

//creation de la documentation swagger
const document = SwaggerModule.createDocument(app,config);

//Disponible sur http://localhost:3000/api
SwaggerModule.setup('api',app,document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();