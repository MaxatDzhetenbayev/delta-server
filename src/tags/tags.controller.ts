import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AuthGuard } from 'src/auth/auth-guard';


export interface tagsCreateDto{
    name: string;
}


@Controller('tags')
export class TagsController {

    constructor(private tagsService: TagsService){}

    @UseGuards(AuthGuard)
    @Post()
    createTag(@Body() body: tagsCreateDto){
        return this.tagsService.createTag(body)
    }

    @UseGuards(AuthGuard)
    @Get()
    getAll(){
        return this.tagsService.getAllTags()
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string){
        return this.tagsService.deleteOneTagById(id)
    }
}
