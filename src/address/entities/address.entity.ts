import { Address } from '@prisma/client';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';

export class AddressEntity implements Address {
  id: string;
  number: string;
  postcode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string | null;
  observation: string | null;
  customerId: string | null;
  petshopId: string | null;
  createdAt: Date;
  updatedAt: Date;
  customer?: CustomerEntity;
  petshop?: PetshopEntity;
}
