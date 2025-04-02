import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';
import { CreateCustomerDto } from './dtos/create.dto';
import { CustomerEntity } from './entities/customer.entity';
import { IFindPagination } from 'src/interfaces/pagination.interface';
import { CustomerDto } from './dtos/customer.dto';
import { IQueryPagination } from 'src/interfaces/query-pagination.interface';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(
    body: CreateCustomerDto,
    petshopId: string,
  ): Promise<CustomerEntity> {
    return this.customerRepository.create({ ...body, petshopId });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<CustomerDto>> {
    const { data, ...rest } = await this.customerRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(c => new CustomerDto(c)) : [],
    };
  }
}
