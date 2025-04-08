import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerDto } from './dtos/customer.dto';
import { CreateCustomerDto } from './dtos/create.dto';
import { CustomerEntity } from './entities/customer.entity';
import { IFindPagination } from '../interfaces/pagination.interface';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { UpdateCustomerDto } from './dtos/update.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async findById(id: string, petshopId: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findById(id, petshopId);

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado!');
    }

    return customer;
  }

  async create(body: CreateCustomerDto): Promise<CustomerEntity> {
    try {
      return this.customerRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao criar o cliente, por favor verifique os dados!',
      );
    }
  }

  async update(id: string, body: UpdateCustomerDto): Promise<CustomerEntity> {
    await this.findById(id, body.petshopId);
    try {
      return this.customerRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao criar o cliente, por favor verifique os dados!',
      );
    }
  }

  async delete(id: string, petshopId: string): Promise<CustomerEntity> {
    await this.findById(id, petshopId);

    try {
      return this.customerRepository.delete(id, petshopId);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao excluir o cliente, por favor verifique os dados!',
      );
    }
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
