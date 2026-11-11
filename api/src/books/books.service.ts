import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';    
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';   
import{
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
} from'@nestjs/common';


@Injectable()
export class BooksService {
    constructor(private readonly prisma: PrismaService) {}  

    async findAll() {
        return this.prisma.book.findMany({
            include:{
                genre:true,

            }
        });
    }


    async findOne(id: number) {
        const book =await this.prisma.book.findUnique({
        
              where: {
                 id: id,
                },  
        include: {
            genre: true,
        }
    });

    
    if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
    }

async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
        data: {
            title: createBookDto.title,
            author: createBookDto.author,
            genreId: createBookDto.genreId,
        },
        include: {
            genre: true,
        }
    });
}   

async update(id: number, updateBookDto: UpdateBookDto) {
  await this.findOne(id);

  return this.prisma.book.update({
    where: {
      id: id,
    },
    data: updateBookDto,
    include: {
      genre: true,
    },
  });
}

async remove(id: number) {
  await this.findOne(id);

  return this.prisma.book.delete({
    where: { id: id },
  });
}
}