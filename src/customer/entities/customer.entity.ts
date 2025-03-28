import { Customer } from '@prisma/client';
import { PetEntity } from '../../pet/entities/pet.entity';
import { AddressEntity } from '../../address/entities/address.entity';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';

export class CustomerEntity implements Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
  addresses?: AddressEntity[];
  pets?: PetEntity[];
}
