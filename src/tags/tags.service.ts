import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tags } from './tags.model';
import { InjectModel } from '@nestjs/sequelize';
import { tagsCreateDto } from './tags.controller';

@Injectable()
export class TagsService {
    constructor(
    @InjectModel(Tags) private tagRepository: typeof Tags
    ) {}


    async createTag(tagInfo: tagsCreateDto){

        try{

            const createdCard = await this.tagRepository.create(tagInfo)

            if(!createdCard){
                throw new HttpException(
                    `Ошибка создания тэга`,
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


    async getAllTags(){
        try {
            const tags = await this.tagRepository.findAll()

            if(!tags){
                throw new HttpException(
                    `Тэги не найдены`,
                    HttpStatus.NOT_FOUND,
                  );
            }

            return tags
        } catch (error) {

            console.log(error)
            throw new HttpException(
                `${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }


    async deleteOneTagById(id: string){

        try {
            const findedCard =  await this.tagRepository.findOne({where: {
                id
            }})

            if(!findedCard){
                throw new HttpException(
                    `Тэг с таким id не существует`,
                    HttpStatus.NOT_FOUND,
                  );
            }

            await findedCard.destroy()

            return {status: 'success', message: `Тэг с id ${findedCard.id} удален`}

        } catch (error) {
            console.log(error)
            throw new HttpException(
                `${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
        }
    }
}
