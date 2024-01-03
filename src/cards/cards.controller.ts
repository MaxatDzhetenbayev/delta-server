import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthGuard } from 'src/auth/auth-guard';

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


  @UseGuards(AuthGuard)
  @Post()
  createCard(@Body() body: cardsCreateDto) {
    return this.cardsService.createCard(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll(@Query('question') question?: string, @Query('tag') tag?: string) {
    return this.cardsService.getAllCards(question, tag);
  }
  
  @UseGuards(AuthGuard)
  @Get('user/:id')
  getAllByUserId(
    @Param('id') id: number,
    @Query('question') question?: string,
    @Query('tag') tag?: string,
  ) {
    return this.cardsService.getAllCardsByUserId(id, question, tag);
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.cardsService.deleteOneCardById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateItem(@Param('id') id: string, @Body() updateData: CardUpdateDto) {
    return await this.cardsService.updateCardById(id, updateData);
  }
}
