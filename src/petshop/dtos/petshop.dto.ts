import { PetshopEntity } from '../entities/petshop.entity';
import { UserDto } from '../../user/dtos/user.dto';
import { PetDto } from '../../pet/dtos/pet.dto';
import { EmployeeDto } from '../../employee/dtos/employee.dto';
import { BreedDto } from '../../breed/dtos/breed.dto';
import { PositionDto } from '../../position/dtos/position.dto';
import { SpecieDto } from '../../specie/dtos/specie.dto';
import { CustomerDto } from '../../customer/dtos/customer.dto';
import { AddressDto } from '../../address/dtos/address.dto';
import { TaskDto } from '../../task/dtos/task.dto';
import { ProductDto } from '../../product/dtos/product.dto';
import { CategoryDto } from '../../category/dtos/category.dto';
import { AttributeDto } from '../../attribute/dtos/attribute.dto';
import { ScheduleDto } from '../../schedule/dto/schedule.dto';

export class PetshopDto {
  public id: string;
  public name: string;
  public corporateName: string;
  public cnpjCpf: string;
  public image: string | null;
  public active: boolean;
  public users?: UserDto[];
  public pets?: PetDto[];
  public employees?: EmployeeDto[];
  public breeds?: BreedDto[];
  public positions?: PositionDto[];
  public species?: SpecieDto[];
  public customers?: CustomerDto[];
  public addresses?: AddressDto[];
  public services?: TaskDto[];
  public products?: ProductDto[];
  public categories?: CategoryDto[];
  public attributes?: AttributeDto[];
  public schedules?: ScheduleDto[];

  constructor(data: PetshopEntity) {
    this.id = data.id;
    this.name = data.name;
    this.corporateName = data.corporateName;
    this.cnpjCpf = data.cnpjCpf;
    this.image = data.image;
    this.active = data.active;
    this.users =
      data.users && data.users.length
        ? data.users.map(u => new UserDto(u))
        : [];
    this.pets =
      data.pets && data.pets.length ? data.pets.map(p => new PetDto(p)) : [];
    this.employees =
      data.employees && data.employees.length
        ? data.employees.map(e => new EmployeeDto(e))
        : [];
    this.breeds =
      data.breeds && data.breeds.length
        ? data.breeds.map(b => new BreedDto(b))
        : [];
    this.positions =
      data.positions && data.positions.length
        ? data.positions.map(p => new PositionDto(p))
        : [];
    this.species =
      data.species && data.species.length
        ? data.species.map(s => new SpecieDto(s))
        : [];
    this.customers =
      data.customers && data.customers.length
        ? data.customers.map(c => new CustomerDto(c))
        : [];
    this.addresses =
      data.addresses && data.addresses.length
        ? data.addresses.map(a => new AddressDto(a))
        : [];
    this.services =
      data.services && data.services.length
        ? data.services.map(t => new TaskDto(t))
        : [];
    this.products =
      data.products && data.products.length
        ? data.products.map(p => new ProductDto(p))
        : [];
    this.categories =
      data.categories && data.categories.length
        ? data.categories.map(c => new CategoryDto(c))
        : [];
    this.attributes =
      data.attributes && data.attributes.length
        ? data.attributes.map(a => new AttributeDto(a))
        : [];
    this.schedules =
      data.schedules && data.schedules.length
        ? data.schedules.map(s => new ScheduleDto(s))
        : [];
  }
}
