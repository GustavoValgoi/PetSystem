import { $Enums, User } from '@prisma/client';
import { PetshopEntity } from '../../petshop/entities/petshop.entity';

export class UserEntity implements User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  active: boolean;
  isRoot: boolean;
  role: $Enums.Role;
  petshopId: string | null;
  createdAt: Date;
  updatedAt: Date;
  petshop?: PetshopEntity;
}
