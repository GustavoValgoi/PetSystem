import { $Enums } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  public id: string;
  public name: string;
  public username: string;
  public email: string;
  public phone: string;
  public isRoot: boolean;
  public role: $Enums.Role;
  public petshopId: string | null;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.isRoot = user.isRoot;
    this.role = user.role;
    this.petshopId = user.petshopId;
  }
}
