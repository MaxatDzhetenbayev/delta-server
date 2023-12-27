import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cards } from './cards.model';


@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [SequelizeModule.forFeature([Cards])]
})
export class CardsModule {}
