import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
@Throttle({ default: {limit: 5, ttl:60000}}) // 5 requetes pour 1mn d'arret
export class AuthController{
  constructor(
    private readonly authService: AuthService,
  ){}

//inscrption
  @Post('register')
  register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto);
  }
//connexion
  @Post('login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }
}