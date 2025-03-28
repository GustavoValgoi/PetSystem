import { Test, TestingModule } from '@nestjs/testing';
import { AttributeItemController } from '../attribute-item.controller';

describe('AttributeItemController', () => {
  let controller: AttributeItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttributeItemController],
    }).compile();

    controller = module.get<AttributeItemController>(AttributeItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
