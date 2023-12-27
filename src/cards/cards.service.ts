import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Cards } from './cards.model';
import { CardUpdateDto, cardsCreateDto } from './cards.controller';
import { Op } from 'sequelize';

@Injectable()
export class CardsService {
    constructor(@InjectModel(Cards) private cardsRepository: typeof Cards) {}

    async createCard(cardInfo: cardsCreateDto){

        try{

            const createdCard = await this.cardsRepository.create(cardInfo)

            if(!createdCard){
                throw new HttpException(
                    `Ошибка создания карточки`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  );
            }

            return createdCard
        }catch(error){
            console.log(error)
            throw new HttpException(
                `${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }

    async getAllCards(question: string){

        const whereCondition:any = {};


        if (question) {
            // Добавление условия LIKE, если question передан
            whereCondition.question = { [Op.like]: `%${question}%` };
        }

        try {

            const cards = await this.cardsRepository.findAll({where: whereCondition})

            if(!cards){
                throw new HttpException(
                    `Карточки не найдены`,
                    HttpStatus.NOT_FOUND,
                  );
            }
            
            return cards

        } catch (error) {
            console.log(error)
            throw new HttpException(
                `${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }
    async deleteOneCardById(id: string){

        try {
            const findedCard =  await this.cardsRepository.findOne({where: {
                id
            }})

            if(!findedCard){
                throw new HttpException(
                    `Карты с таким id не существует`,
                    HttpStatus.NOT_FOUND,
                  );
            }

            await findedCard.destroy()

            return {status: 'success', message: `Карточка с id ${findedCard.id} удалена`}

        } catch (error) {
            console.log(error)
            throw new HttpException(
                `${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }



    async updateCardById(id: string, newBody: CardUpdateDto){

        try {
            const findedCard =  await this.cardsRepository.findOne({where: {
                id
            }})

            if(!findedCard){
                throw new HttpException(
                    `Карты с таким id не существует`,
                    HttpStatus.NOT_FOUND,
                  );
            }
            await findedCard.update(newBody)

            return {status: 'success', message: `Карточка с id ${findedCard.id} изменена`}

        } catch (error) {
            console.log(error)
            throw new HttpException(
                `${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }

}
