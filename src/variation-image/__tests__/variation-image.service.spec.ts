import { Test, TestingModule } from '@nestjs/testing';
import { VariationImageService } from './variation-image.service';

describe('VariationImageService', () => {
  let service: VariationImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariationImageService],
    }).compile();

    service = module.get<VariationImageService>(VariationImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
