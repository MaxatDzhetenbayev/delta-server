import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userCreateDto } from './users.controller';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {}

  async createUser(userDto: userCreateDto) {
    try {
      const { password, username } = userDto;

      const findedUser = await this.findUserByName(username);

      if (findedUser.success) {
        throw new HttpException(
          'Пользователь с таким username уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const saltOrRounds = 10;
      const passwordhash = await bcrypt.hash(password, saltOrRounds);

      const createdUser = await this.userRepository.create({
        username,
        passwordhash,
      });

      if (!createdUser)
        throw new HttpException(
          'Пользователь не был создан',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      return { status: true, data: createdUser };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserByName(userName: string) {
    try {
      const findedUser = await this.userRepository.findOne({
        where: { username: userName },
      });

      if (!findedUser) return { success: false };

      return { success: true, data: findedUser };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserById(userId: number) {
    try {
      const findedUser = await this.userRepository.findByPk(userId);

      if (!findedUser)
        throw new HttpException(
          'Такого пользователя не существует',
          HttpStatus.BAD_REQUEST,
        );

      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
