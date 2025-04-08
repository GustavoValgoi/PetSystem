import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskDto } from './dtos/task.dto';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dtos/create.dto';
import { UpdateTaskDto } from './dtos/update.dto';
import { TaskRepository } from './repositories/task.repository';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { FileService } from '../file/file.service';
import { ImageFolderName } from '../file/enums/image-folder-name.enum';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly fileService: FileService,
  ) {}

  async findById(id: string, petshopId: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findById(id, petshopId);

    if (!task) {
      throw new NotFoundException('Serviço não encontrado!');
    }

    return task;
  }

  async delete(id: string, petshopId: string): Promise<TaskEntity> {
    await this.findById(id, petshopId);

    try {
      const task = await this.taskRepository.delete(id, petshopId);

      if (task.image) {
        this.fileService.removePhoto(
          petshopId,
          task.image,
          ImageFolderName.SERVICE,
        );
      }

      return task;
    } catch {
      throw new BadRequestException('Houve um problema ao excluir o serviço!');
    }
  }

  async create(
    body: CreateTaskDto,
    image?: Express.Multer.File,
  ): Promise<TaskEntity> {
    try {
      if (image) {
        const { imageName } = await this.fileService.uploadPhoto(
          body.petshopId,
          ImageFolderName.SERVICE,
          image,
        );

        if (imageName) {
          body.image = imageName;
        }
      }

      return this.taskRepository.create(body);
    } catch {
      throw new BadRequestException('Houve um problema ao criar o serviço!');
    }
  }

  async update(
    id: string,
    body: UpdateTaskDto,
    image?: Express.Multer.File,
  ): Promise<TaskEntity> {
    const task = await this.findById(id, body.petshopId);
    try {
      if (image) {
        if (task.image) {
          const { imageName } = await this.fileService.updatePhoto(
            body.petshopId,
            task.image,
            ImageFolderName.SERVICE,
            image,
          );

          if (imageName) {
            body.image = imageName;
          }
        } else {
          const { imageName } = await this.fileService.uploadPhoto(
            body.petshopId,
            ImageFolderName.SERVICE,
            image,
          );

          if (imageName) {
            body.image = imageName;
          }
        }
      }

      return this.taskRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar o serviço!',
      );
    }
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<TaskDto>> {
    const { data, ...rest } = await this.taskRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(t => new TaskDto(t)) : [],
    };
  }
}
