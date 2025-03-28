import { Petshop } from '@prisma/client';
import { BreedEntity } from '../../breed/entities/breed.entity';
import { EmployeeEntity } from '../../employee/entities/employee.entity';
import { PetEntity } from '../../pet/entities/pet.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { PositionEntity } from '../../position/entities/position.entity';
import { SpecieEntity } from '../../specie/entities/specie.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { AddressEntity } from '../../address/entities/address.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { AttributeEntity } from '../../attribute/entities/attribute.entity';

export class PetshopEntity implements Petshop {
  id: string;
  name: string;
  corporateName: string;
  cnpjCpf: string;
  image: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  pets?: PetEntity[];
  users?: UserEntity[];
  breeds?: BreedEntity[];
  services?: TaskEntity[];
  species?: SpecieEntity[];
  products?: ProductEntity[];
  addresses?: AddressEntity[];
  employees?: EmployeeEntity[];
  positions?: PositionEntity[];
  customers?: CustomerEntity[];
  categories?: CategoryEntity[];
  attributes?: AttributeEntity[];
}
