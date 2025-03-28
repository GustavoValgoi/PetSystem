import { Specie } from '@prisma/client';
import { PetEntity } from '../../pet/entities/pet.entity';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';

export class SpecieEntity implements Specie {
  id: string;
  name: string;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
  pets?: PetEntity[];
}
