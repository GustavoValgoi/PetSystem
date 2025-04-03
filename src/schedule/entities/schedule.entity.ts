import { Schedule } from '@prisma/client';
import { EmployeeEntity } from '../../employee/entities/employee.entity';
import { PetEntity } from '../../pet/entities/pet.entity';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';

export class ScheduleEntity implements Schedule {
  id: string;
  day: Date;
  startHour: Date;
  finishHour: Date;
  petId: string;
  petshopId: string;
  employeeId: string | null;
  createdAt: Date;
  updatedAt: Date;
  pet?: PetEntity;
  petshop?: PetshopEntity;
  employee?: EmployeeEntity;
}
