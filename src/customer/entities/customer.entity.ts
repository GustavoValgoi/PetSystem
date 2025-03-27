import { Customer } from '@prisma/client';
import { PetEntity } from '../../pet/entities/pet.entity';

export class CustomerEntity implements Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  pets?: PetEntity[];
}
