import { CustomerDto } from '../../customer/dtos/customer.dto';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';
import { AddressEntity } from '../entities/address.entity';

export class AddressDto {
  public id: string;
  public number: string;
  public postcode: string;
  public street: string;
  public neighborhood: string;
  public city: string;
  public state: string;
  public complement: string | null;
  public observation: string | null;
  public customerId: string | null;
  public petshopId: string | null;
  public customer?: CustomerDto;
  public petshop?: PetshopDto;

  constructor(data: AddressEntity) {
    this.id = data.id;
    this.number = data.number;
    this.street = data.street;
    this.city = data.city;
    this.neighborhood = data.neighborhood;
    this.postcode = data.postcode;
    this.state = data.state;
    this.complement = data.complement;
    this.observation = data.observation;
    this.customerId = data.customerId;
    this.petshopId = data.petshopId;
    this.customer = data.customer ? new CustomerDto(data.customer) : undefined;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
  }
}
