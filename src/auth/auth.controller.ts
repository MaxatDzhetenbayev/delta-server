import { Body, Controller, Get, Post, Response, UseGuards, Request } from '@nestjs/common';
import {userCreateDto} from '../users/users.controller'
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard';




@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: userCreateDto, ){
        return  this.authService.register(registerDto)


    }

    
    @Post('login')
    async login(@Body() loginDto: userCreateDto){
        const userData =  await this.authService.login(loginDto)
        return userData
    }

    @UseGuards(AuthGuard)
    @Get('check-session')
    checkSession(@Request() req) {
        return {
          success: req.hasToken,
        };
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Response({ passthrough: true }) res){

    res.clearCookie('token')
    return {
        status: 'success',
    };
}
}