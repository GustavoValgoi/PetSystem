import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from '../dtos/create.dto';
import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateCustomerDto): Promise<CustomerEntity> {
    return this.prisma.customer.create({
      data: body,
    });
  }
}
