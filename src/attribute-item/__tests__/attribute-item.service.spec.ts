import { Test, TestingModule } from '@nestjs/testing';
import { AttributeItemService } from '../attribute-item.service';

describe('AttributeItemService', () => {
  let service: AttributeItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeItemService],
    }).compile();

    service = module.get<AttributeItemService>(AttributeItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
