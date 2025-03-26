import { Test, TestingModule } from '@nestjs/testing';
import { PetshopController } from '../petshop.controller';

describe('PetshopController', () => {
  let controller: PetshopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetshopController],
    }).compile();

    controller = module.get<PetshopController>(PetshopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
