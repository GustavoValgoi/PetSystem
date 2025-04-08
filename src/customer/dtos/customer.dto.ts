import { PetDto } from '../../pet/dtos/pet.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { AddressDto } from '../../address/dtos/address.dto';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';

export class CustomerDto {
  public id: string;
  public name: string;
  public email: string;
  public phone: string;
  public petshop?: PetshopDto;
  public addresses?: AddressDto[];
  public pets?: PetDto[];

  constructor(data: CustomerEntity) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
    this.pets =
      data.pets && data.pets.length ? data.pets.map(p => new PetDto(p)) : [];
    this.addresses =
      data.addresses && data.addresses.length
        ? data.addresses.map(a => new AddressDto(a))
        : [];
  }
}
