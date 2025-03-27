import { PetDto } from 'src/pet/dtos/pet.dto';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerDto {
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public pets: PetDto[];

  constructor(data: CustomerEntity) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.pets =
      data.pets && data.pets.length ? data.pets.map(p => new PetDto(p)) : [];
  }
}
