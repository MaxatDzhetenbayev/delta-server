import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([Users])],
  controllers: [UsersController],
})
export class UsersModule {}
