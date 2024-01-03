import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userCreateDto } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}


    async register(registerDto: userCreateDto){
            return this.userService.createUser(registerDto)
    }

    async login(loginDto: userCreateDto){
        const validateUser = await this.userService.userValidation(loginDto)

        if(!validateUser.success) throw new HttpException('Неправильный логин или пароль', HttpStatus.BAD_REQUEST)

        return validateUser.data

    
    }
}
