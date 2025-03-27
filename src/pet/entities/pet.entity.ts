import { Pet } from '@prisma/client';
import { CustomerEntity } from '../../customer/entities/customer.entity';

export class PetEntity implements Pet {
  id: string;
  name: string;
  observation: string | null;
  image: string | null;
  customerId: string;
  petshopId: string;
  breedId: string | null;
  specieId: string | null;
  createdAt: Date;
  updatedAt: Date;
  customer?: CustomerEntity;
}
