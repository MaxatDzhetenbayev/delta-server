import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';

export interface cardsCreateDto {
  question: string;
  answer: string;
  tagId: number;
  userId: number;
}

export type CardUpdateDto = Partial<cardsCreateDto>;

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  createCard(@Body() body: cardsCreateDto) {
    return this.cardsService.createCard(body);
  }

  @Get()
  getAll(@Query('question') question?: string, @Query('tag') tag?: string) {
    return this.cardsService.getAllCards(question, tag);
  }
  
  @Get('user/:id')
  getAllByUserId(
    @Param('id') id: number,
    @Query('question') question?: string,
    @Query('tag') tag?: string,
  ) {
    return this.cardsService.getAllCardsByUserId(id, question, tag);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.cardsService.deleteOneCardById(id);
  }

  @Put(':id')
  async updateItem(@Param('id') id: string, @Body() updateData: CardUpdateDto) {
    return await this.cardsService.updateCardById(id, updateData);
  }
}
