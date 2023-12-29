import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { Tags } from './tags.model';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [SequelizeModule.forFeature([Tags])]
})
export class TagsModule {}
