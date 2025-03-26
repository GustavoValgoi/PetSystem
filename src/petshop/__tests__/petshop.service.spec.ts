import { Test, TestingModule } from '@nestjs/testing';
import { PetshopService } from '../petshop.service';

describe('PetshopService', () => {
  let service: PetshopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetshopService],
    }).compile();

    service = module.get<PetshopService>(PetshopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
