import { Breed } from '@prisma/client';
import { PetEntity } from '../../pet/entities/pet.entity';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';

export class BreedEntity implements Breed {
  id: string;
  name: string;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
  pets?: PetEntity[];
}
