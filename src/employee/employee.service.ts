import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeDto } from './dtos/employee.dto';
import { CreateEmployeeDto } from './dtos/create.dto';
import { UpdateEmployeeDto } from './dtos/update.dto';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeEntity } from './entities/employee.entity';
import { FileService } from '../file/file.service';
import { ImageFolderName } from '../file/enums/image-folder-name.enum';
import { IFindPagination } from '../interfaces/pagination.interface';
import { IQueryPagination } from '../interfaces/query-pagination.interface';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly fileService: FileService,
  ) {}

  async create(
    body: CreateEmployeeDto,
    image?: Express.Multer.File,
  ): Promise<EmployeeEntity> {
    try {
      if (image) {
        const { imageName } = await this.fileService.uploadPhoto(
          body.petshopId,
          ImageFolderName.EMPLOYEE,
          image,
        );

        if (imageName) {
          body.image = imageName;
        }
      }

      return this.employeeRepository.create({
        ...body,
        active: true,
      });
    } catch {
      throw new BadRequestException(
        'Houve um problema ao criar o funcionário, verifique os dados!',
      );
    }
  }

  async update(
    employeeId: string,
    body: UpdateEmployeeDto,
    image?: Express.Multer.File,
  ): Promise<EmployeeEntity> {
    const employee = await this.findById(employeeId, body.petshopId);

    try {
      if (image) {
        if (!employee.image) {
          const { imageName } = await this.fileService.uploadPhoto(
            body.petshopId,
            ImageFolderName.EMPLOYEE,
            image,
          );

          if (imageName) {
            body.image = imageName;
          }
        } else {
          const { imageName } = await this.fileService.updatePhoto(
            body.petshopId,
            employee.image,
            ImageFolderName.EMPLOYEE,
            image,
          );

          if (imageName) {
            body.image = imageName;
          }
        }
      }

      return this.employeeRepository.update(employeeId, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar o funcionário, verifique os dados!',
      );
    }
  }

  async findById(
    employeeId: string,
    petshopId: string,
  ): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findById(
      employeeId,
      petshopId,
    );

    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado!');
    }

    return employee;
  }

  async delete(employeeId: string, petshopId: string): Promise<EmployeeEntity> {
    await this.findById(employeeId, petshopId);

    try {
      return this.employeeRepository.delete(employeeId, petshopId);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao excluir o funcionário!',
      );
    }
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<EmployeeDto>> {
    const { data, ...rest } = await this.employeeRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(e => new EmployeeDto(e)) : [],
    };
  }
}
