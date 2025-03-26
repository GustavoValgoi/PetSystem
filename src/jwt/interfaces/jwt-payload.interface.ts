import { RoleEnum } from '../../enums/role.enum';

export interface JwtPayloadInterface {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
  root: boolean;
  petshopId: string | null;
  iat: number;
  exp: number;
  iss: string;
}
