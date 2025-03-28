import { EmployeeDto } from '../../employee/dtos/employee.dto';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';
import { PositionEntity } from '../entities/position.entity';

export class PositionDto {
  public id: string;
  public name: string;
  public petshopId: string;
  public petshop?: PetshopDto;
  public employees?: EmployeeDto[];

  constructor(data: PositionEntity) {
    this.id = data.id;
    this.name = data.name;
    this.petshopId = data.petshopId;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
    this.employees =
      data.employees && data.employees.length
        ? data.employees.map(e => new EmployeeDto(e))
        : [];
  }
}
