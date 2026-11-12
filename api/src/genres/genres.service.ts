import { 
    Injectable, 
    NotFoundException ,
    ConflictException,

  } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGenreDto } from './dto/create-genre.dto.js'; 
import { UpdateGenreDto } from './dto/update-genre.dto.js'; 

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.genre.findMany({
      include: {
        _count: {
          select: { books: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
        where:{id: id},
        include:{
            books:true,
        },
    });

    if(!genre){
        throw new NotFoundException(`Genre with ID ${id} not found`);   
    }

    return genre;
  }


  async create(createGenreDto: CreateGenreDto) {
    const existingGenre = await this.prisma.genre.findUnique({
        where: { name: createGenreDto.name },
    });

    if (existingGenre) {
        throw new ConflictException(`Genre with name ${createGenreDto.name} already exists`);
    }

    return this.prisma.genre.create({
        data: createGenreDto,
    });
}   

async update(id: number, updateGenreDto: UpdateGenreDto) {
  await this.findOne(id);

  if (updateGenreDto.name) {
    const existingGenre = await this.prisma.genre.findUnique({
      where: { name: updateGenreDto.name },
    });

    if (existingGenre && existingGenre.id !== id) {
      throw new ConflictException(
        `Genre with name ${updateGenreDto.name} already exists`,
      );
    }
  }

  return this.prisma.genre.update({
    where: { id },
    data: updateGenreDto,
  });
}

async remove(id: number) {
  const genre = await this.findOne(id);

  if (genre.books.length > 0) {
    throw new ConflictException(
      'Cannot delete a genre that has books assigned to it',
    );
  }

  return this.prisma.genre.delete({
    where: { id },
  });
}
}