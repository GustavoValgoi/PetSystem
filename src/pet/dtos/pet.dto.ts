import { CustomerDto } from 'src/customer/dtos/customer.dto';
import { PetEntity } from '../entities/pet.entity';

export class PetDto {
  public id: string;
  public name: string;
  public customerId: string;
  public petshopId: string;
  public observation: string | null;
  public image: string | null;
  public breedId: string | null;
  public specieId: string | null;
  public customer?: CustomerDto;

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
  }
}
