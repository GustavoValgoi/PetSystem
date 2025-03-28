import { PetEntity } from '../entities/pet.entity';
import { CustomerDto } from '../../customer/dtos/customer.dto';
import { BreedDto } from '../../breed/dtos/breed.dto';
import { SpecieDto } from '../../specie/dtos/specie.dto';
import { ScheduleDto } from '../../schedule/dto/schedule.dto';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';

export class PetDto {
  public id: string;
  public name: string;
  public customerId: string;
  public petshopId: string;
  public observation: string | null;
  public image: string | null;
  public breedId: string | null;
  public specieId: string | null;
  public petshop?: PetshopDto;
  public customer?: CustomerDto;
  public breed?: BreedDto;
  public specie?: SpecieDto;
  public schedules?: ScheduleDto[];

  constructor(data: PetEntity) {
    this.id = data.id;
    this.name = data.name;
    this.customerId = data.customerId;
    this.petshopId = data.petshopId;
    this.observation = data.observation;
    this.image = data.image;
    this.breedId = data.breedId;
    this.specieId = data.specieId;
    this.customer = data.customer ? new CustomerDto(data.customer) : undefined;
    this.breed = data.breed ? new BreedDto(data.breed) : undefined;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
    this.specie = data.specie ? new SpecieDto(data.specie) : undefined;
    this.schedules =
      data.schedules && data.schedules.length
        ? data.schedules.map(s => new ScheduleDto(s))
        : [];
  }
}
