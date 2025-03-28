import { PetDto } from '../../pet/dtos/pet.dto';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';
import { SpecieEntity } from '../entities/specie.entity';

export class SpecieDto {
  public id: string;
  public name: string;
  public petshopId: string;
  public petshop?: PetshopDto;
  public pets?: PetDto[];

  constructor(data: SpecieEntity) {
    this.id = data.id;
    this.name = data.name;
    this.petshopId = data.petshopId;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
    this.pets =
      data.pets && data.pets.length ? data.pets.map(p => new PetDto(p)) : [];
  }
}
