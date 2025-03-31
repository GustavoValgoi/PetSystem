import { Pet } from '@prisma/client';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { BreedEntity } from '../../breed/entities/breed.entity';
import { SpecieEntity } from '../../specie/entities/specie.entity';
import { ScheduleEntity } from '../../schedule/entities/schedule.entity';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';

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
  petshop?: PetshopEntity;
  customer?: CustomerEntity;
  breed?: BreedEntity | null;
  specie?: SpecieEntity | null;
  schedules?: ScheduleEntity[];
}
