import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Cards } from './cards.model';
import { CardUpdateDto, cardsCreateDto } from './cards.controller';
import { Op } from 'sequelize';
import { Tags } from 'src/tags/tags.model';

@Injectable()
export class CardsService {
    constructor(
        @InjectModel(Cards) private cardsRepository: typeof Cards, 
    ) {}


   /**
    * Функция создает карту, используя предоставленную информацию о карте, и возвращает созданную карту
    * или выдает ошибку, если возникает проблема.
    * @param {cardsCreateDto} cardInfo - Параметр cardInfo имеет тип cardsCreateDto, который, скорее
    * всего, является объектом передачи данных (DTO), содержащим информацию, необходимую для создания
    * новой карты. Конкретные свойства и структуру cardsCreateDto необходимо будет определить в другом
    * месте кода.
    * @returns созданная карта, если она успешно создана.
    */
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

    /**
     * Функция getAllCards извлекает все карточки на основе заданных параметров вопроса и тега.
     * @param {string} question - Строка, представляющая вопрос для поиска на карточках. Если это
     * предусмотрено, функция добавит в запрос условие LIKE для поиска карточек с вопросом, содержащим
     * указанную строку.
     * @param {string} tag - Параметр tag используется для фильтрации карточек по определенному тегу.
     * Если указано значение tag, функция включит в запрос условие для извлечения только карточек,
     * имеющих соответствующий идентификатор tagId.
     * @returns Обещание, которое разрешается в массив карточек, соответствующих заданному вопросу и
     * тегу.
     */
    async getAllCards(question: string, tag: string){

        const whereCondition:any = {};

        // Добавление условия LIKE, если question передан
        if (question) whereCondition.question = { [Op.like]: `%${question}%` };
        // Добавление условия поиска, если tag передан
        if (tag) whereCondition.tagId = tag;

        try {
            const cards = await this.cardsRepository.findAll({
                where: whereCondition, 
                include: [
                    {
                        model: Tags,
                        attributes: { exclude: ['id']}
                    }
                ]
            })

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


    /**
     * Эта функция TypeScript удаляет карту по ее идентификатору и возвращает сообщение об успехе, если
     * удаление прошло успешно.
     * @param {string} id - Параметр `id` — это строка, представляющая уникальный идентификатор карты,
     * которую необходимо удалить.
     * @returns объект с двумя свойствами: «статус» и «сообщение». Свойство status указывает статус
     * операции, который устанавливается на «успех», если карта успешно удалена. Свойство message
     * предоставляет сообщение о том, что карта с указанным идентификатором была удалена.
     */
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



    /**
     * Эта функция обновляет карту с заданным идентификатором, используя предоставленное новое тело.
     * @param {string} id - Параметр `id` — это строка, представляющая уникальный идентификатор карты,
     * которую необходимо обновить.
     * @param {CardUpdateDto} newBody - Параметр newBody — это объект типа CardUpdateDto, который
     * содержит обновленные свойства карты.
     * @returns объект с двумя свойствами: «статус» и «сообщение». Свойство status указывает статус
     * операции, которому в данном случае присвоено значение «успех». Свойство message предоставляет
     * сообщение о том, что карта с указанным идентификатором была обновлена.
     */
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
