import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller.js';
import { GenresService } from './genres.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [GenresController],
  providers: [GenresService],
  imports: [PrismaModule]
})
export class GenresModule {}
