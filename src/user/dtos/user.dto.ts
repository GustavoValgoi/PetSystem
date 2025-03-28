import { $Enums } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';
import { PetshopDto } from '../../petshop/dtos/petshop.dto';

export class UserDto {
  public id: string;
  public name: string;
  public username: string;
  public email: string;
  public phone: string;
  public isRoot: boolean;
  public role: $Enums.Role;
  public petshopId: string | null;
  public petshop?: PetshopDto;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.isRoot = user.isRoot;
    this.role = user.role;
    this.petshopId = user.petshopId;
    this.petshop = user.petshop ? new PetshopDto(user.petshop) : undefined;
  }
}
