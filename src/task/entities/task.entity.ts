import { Service } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';

export class TaskEntity implements Service {
  id: string;
  name: string;
  description: string;
  amount: Decimal;
  image: string | null;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
}
