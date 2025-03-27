import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';
import { CreateCustomerDto } from './dtos/create.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(
    body: CreateCustomerDto,
    petshopId: string,
  ): Promise<CustomerEntity> {
    return this.customerRepository.create({ ...body, petshopId });
  }
}
