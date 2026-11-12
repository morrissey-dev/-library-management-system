import { Controller,
     Get, 
     Param,
     Post,
     Body,
     Patch,
     Delete,
    } from '@nestjs/common';
import { GenresService } from './genres.service.js'; 
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(Number(id));
  }

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  } 

  @Patch(':id')
  update(
    @Param('id') id: string,
     @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(Number(id), updateGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(Number(id));
  } 
}