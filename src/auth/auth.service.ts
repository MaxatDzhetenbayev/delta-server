import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userCreateDto } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService, 
        private readonly jwtService: JwtService) {

        }


    async register(registerDto: userCreateDto){
            return this.userService.createUser(registerDto)
    }

    async login(loginDto: userCreateDto){
        const validateUser = await this.userService.userValidation(loginDto)

        if(!validateUser.success) throw new HttpException('Неправильный логин или пароль', HttpStatus.BAD_REQUEST)

        const {data: {username, id, passwordhash }, success} = validateUser.data

        const access_token = await this.generateToken(id, username)

        return { id, username, access_token, success}
    }

    async generateToken(id: number, name: string): Promise<string> {
        const payload = { id, name };
        return this.jwtService.sign(payload);
      }
}
