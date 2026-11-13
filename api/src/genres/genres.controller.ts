import { Controller,
     Get,
     Param,
     Post,
     Body,
     Patch,
     Delete,
     UseGuards,
    } from '@nestjs/common';
import { GenresService } from './genres.service.js';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { UpdateGenreDto } from './dto/update-genre.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';



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

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('LIBRARIAN')
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }


  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('LIBRARIAN')
  @Patch(':id')
  update(
    @Param('id') id: string,
     @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(Number(id), updateGenreDto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('LIBRARIAN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(Number(id));
  }
}