import { PetshopDto } from 'src/petshop/dtos/petshop.dto';
import { TaskEntity } from '../entities/task.entity';

export class TaskDto {
  public id: string;
  public name: string;
  public description: string;
  public amount: number;
  public image: string | null;
  public petshopId: string;
  public petshop?: PetshopDto;

  constructor(data: TaskEntity) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.amount = Number(data.amount);
    this.image = data.image;
    this.petshopId = data.petshopId;
    this.petshop = data.petshop ? new PetshopDto(data.petshop) : undefined;
  }
}
