import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cards } from './cards.model';
import { Tags } from 'src/tags/tags.model';


@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [SequelizeModule.forFeature([Cards, Tags])]
})
export class CardsModule {}
