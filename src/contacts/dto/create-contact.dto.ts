import { IsBoolean, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateContactDto {
@IsString()
@IsNotEmpty()
  nom: string;
  
@IsString()
@IsNotEmpty()
@Matches(/^[0-9]{9}$/,{
  message: 'Le numero doit contenir 9 chiffres',
})
  telephone: string;

@IsBoolean()
  favori: boolean;
}