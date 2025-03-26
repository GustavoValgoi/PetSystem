import { $Enums, User } from '@prisma/client';

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
}
