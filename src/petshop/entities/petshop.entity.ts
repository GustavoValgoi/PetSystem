import { Petshop } from '@prisma/client';

export class PetshopEntity implements Petshop {
  id: string;
  name: string;
  corporateName: string;
  cnpjCpf: string;
  image: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
