import { Test, TestingModule } from '@nestjs/testing';
import { GenresService } from './genres.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('GenresService', () => {
  let service: GenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenresService,
      {
        provide: PrismaService,
        useValue: {
          genre: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            count: vi.fn(),
          },
        },
      },
    ],
    }).compile();

    service = module.get<GenresService>(GenresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
