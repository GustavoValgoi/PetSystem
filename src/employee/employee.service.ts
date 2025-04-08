import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeEntity } from './entities/employee.entity';
import { CreateEmployeeDto } from './dtos/create.dto';
import { EmployeeRepository } from './repositories/employee.repository';
import { FileService } from '../file/file.service';
import { ImageFolderName } from '../file/enums/image-folder-name.enum';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly fileService: FileService,
  ) {}

  async create(
    body: CreateEmployeeDto,
    petshopId: string,
    image?: Express.Multer.File,
  ): Promise<EmployeeEntity> {
    if (image) {
      const { imageName } = await this.fileService.uploadPhoto(
        petshopId,
        ImageFolderName.EMPLOYEE,
        image,
      );

      if (imageName) {
        body.image = imageName;
      }
    }

    return this.employeeRepository.create({
      ...body,
      petshopId,
      active: true,
    });
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
}
