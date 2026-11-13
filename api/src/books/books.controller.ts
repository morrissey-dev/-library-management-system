import { Controller, Get, Post,Body, Param, Patch,Delete,UseGuards } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import{JwtAuthGuard} from '../auth/guards/jwt-auth.guard.js'
import{RolesGuard} from '../auth/guards/roles.guard.js'
import { Roles } from '../auth/decorators/roles.decorator.js';
import { use } from 'passport';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}


    @Get()
    async findAll() {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id: string) {
        return this.booksService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('LIBRARIAN')
    @Post()
    async create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }


    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('LIBRARIAN')
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto,
    ) {
        return this.booksService.update(+id, updateBookDto);
    }


    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('LIBRARIAN')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.remove(+id);
    }
}