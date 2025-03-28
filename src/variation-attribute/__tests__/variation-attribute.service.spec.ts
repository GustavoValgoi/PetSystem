import { Test, TestingModule } from '@nestjs/testing';
import { VariationAttributeService } from '../variation-attribute.service';

describe('VariationAttributeService', () => {
  let service: VariationAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariationAttributeService],
    }).compile();

    service = module.get<VariationAttributeService>(VariationAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
