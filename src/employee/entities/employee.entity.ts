import { Employee } from '@prisma/client';

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
}
