import { Employee } from '@prisma/client';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';
import { ScheduleEntity } from '../../schedule/entities/schedule.entity';
import { PositionEntity } from '../../position/entities/position.entity';

export class EmployeeEntity implements Employee {
  id: string;
  name: string;
  image: string | null;
  phone: string | null;
  active: boolean;
  petshopId: string;
  positionId: string | null;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
  position?: PositionEntity;
  schedules?: ScheduleEntity[];
}
