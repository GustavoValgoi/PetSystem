import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PrismaClient],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should have been called', async () => {
      const spy = jest.spyOn(service, 'onModuleInit');

      await service.onModuleInit();

      expect(spy.mock.invocationCallOrder[0]).toEqual(1);
    });
  });
});
