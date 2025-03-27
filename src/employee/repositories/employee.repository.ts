import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dtos/create.dto';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateEmployeeDto): Promise<EmployeeEntity> {
    return this.prisma.employee.create({
      data: body,
    });
  }

  async findById(
    employeeId: string,
    petshopId: string,
  ): Promise<EmployeeEntity | null> {
    return this.prisma.employee.findFirst({
      where: {
        id: employeeId,
        AND: [{ petshopId }],
      },
    });
  }
}
