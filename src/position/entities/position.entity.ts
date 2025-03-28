import { Position } from '@prisma/client';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';
import { EmployeeEntity } from '../../employee/entities/employee.entity';

export class PositionEntity implements Position {
  name: string;
  id: string;
  petshopId: string;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
  employees?: EmployeeEntity[];
}
