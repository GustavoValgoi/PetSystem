import { ScheduleEntity } from '../entities/schedule.entity';
import { EmployeeDto } from '../../employee/dtos/employee.dto';
import { PetDto } from '../../pet/dtos/pet.dto';

export class ScheduleDto {
  public id: string;
  public day: Date;
  public startHour: Date;
  public finishHour: Date;
  public petId: string;
  public employeeId: string | null;
  public pet?: PetDto;
  public employee?: EmployeeDto;

  constructor(data: ScheduleEntity) {
    this.id = data.id;
    this.day = data.day;
    this.startHour = data.startHour;
    this.finishHour = data.finishHour;
    this.petId = data.petId;
    this.employeeId = data.employeeId;
    this.pet = data.pet ? new PetDto(data.pet) : undefined;
    this.employee = data.employee ? new EmployeeDto(data.employee) : undefined;
  }
}
