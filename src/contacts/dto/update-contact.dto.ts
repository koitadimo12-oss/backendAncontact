import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MATCHES } from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nom?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{9}$/,{
    message:'le numero doit contenir 9 chiffres',
  })
  telephone?: string;

  @IsOptional()
  @IsBoolean()
  favori?: boolean;
}