import { ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { nom, email, password } = registerDto;

    // Vérifier si l'email existe déjà
    const userExistant = await this.userService.findByEmail(email);

    if (userExistant) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await this.userService.create({
      nom,
      email,
      password: hashedPassword,
    });

    // Informations contenues dans le JWT
    const payload = {
      sub: user.id,
      email: user.email,
    };

    // retourner l inscription

    return {
      message: 'Inscription réussie',
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
      },
    };
  }
  //connexion
  async login(loginDto: LoginDto){
const {email,password}= loginDto;

//chercher un user avec son hash pour verifier le mot de pass
const user = await this.userService.findByEmailAvecPassword(email);

if(!user){
  throw new UnauthorizedException("Email ou mot de pass incorect");
}

//verifier le mot de pass
const passwordCorrect=await bcrypt.compare(
  password, user.password,
);

if(!passwordCorrect){
  throw new UnauthorizedException('Email ou mot de pass incorrect',);
}



//information contenues dans le jwt
const payload={
  sub: user.id,
  email: user.email,
};

//cree le token
const accessToken = this.jwtService.sign(payload);

return{
  message: "Connexion reuissie",
  access_token: accessToken,
  user:{
    id:user.id,
    nom: user.nom,
    email:user.email

  },
};
  }
}