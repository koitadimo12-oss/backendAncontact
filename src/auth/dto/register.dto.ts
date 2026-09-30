import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto{

@IsString()
@IsNotEmpty()
nom: string;

@IsEmail()
@IsNotEmpty()
email:string;

@IsString()
@MinLength(8,{
    message : 'le meot de pass doit contenir minimum 8 caracter',
})
 @Matches(/[A-Z]/, {
    message: 'Le mot de passe doit contenir au moins une majuscule',
  })
  @Matches(/[a-z]/, {
    message: 'Le mot de passe doit contenir au moins une minuscule',
  })
  @Matches(/[0-9]/, {
    message: 'Le mot de passe doit contenir au moins un chiffre',
  })
  @Matches(/[^A-Za-z0-9]/, {
  message: 'Le mot de passe doit contenir au moins un caractère spécial',
})

password:string;

}