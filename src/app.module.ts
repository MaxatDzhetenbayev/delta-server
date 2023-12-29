import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsModule } from './cards/cards.module';
import { Cards } from './cards/cards.model';
import { TagsModule } from './tags/tags.module';
import { Tags } from './tags/tags.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: 5432,
      host: 'localhost',
      username: 'postgres',
      password: 'admin',
      database: 'delta',
      models: [Cards, Tags],
    }),
    CardsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
