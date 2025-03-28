import { ScheduleDto } from '../../schedule/dto/schedule.dto';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';
import { EmployeeEntity } from '../entities/employee.entity';
import { PositionDto } from '../../position/dtos/position.dto';

export class EmployeeDto {
  public id: string;
  public name: string;
  public image: string | null;
  public phone: string | null;
  public active: boolean;
  public petshopId: string;
  public positionId: string | null;
  public petshop?: PetshopDto;
  public position?: PositionDto;
  public schedules?: ScheduleDto[];

  constructor(data: EmployeeEntity) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    this.phone = data.phone;
    this.active = data.active;
    this.petshopId = data.petshopId;
    this.positionId = data.positionId;
    this.position = data.position ? new PositionDto(data.position) : undefined;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
    this.schedules =
      data.schedules && data.schedules.length
        ? data.schedules.map(s => new ScheduleDto(s))
        : [];
  }
}
