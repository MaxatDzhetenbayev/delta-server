import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';


export interface tagsCreateDto{
    name: string;
}


@Controller('tags')
export class TagsController {

    constructor(private tagsService: TagsService){}


    @Post()
    createTag(@Body() body: tagsCreateDto){
        return this.tagsService.createTag(body)
    }

    @Get()
    getAll(){
        return this.tagsService.getAllTags()
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string){
        return this.tagsService.deleteOneTagById(id)
    }
}
