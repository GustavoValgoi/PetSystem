import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddressRepository } from './repositories/address.repository';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { AddressDto } from './dtos/address.dto';
import { AddressEntity } from './entities/address.entity';
import { UpdateAddressDto } from './dtos/update.dto';
import { CreateAddressDto } from './dtos/create.dto';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async findById(id: string, petshopId: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findById(id, petshopId);

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }

    return address;
  }

  async create(body: CreateAddressDto): Promise<AddressEntity> {
    try {
      return this.addressRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao cadastrar o endereço, verifique as informações enviadas!',
      );
    }
  }

  async update(id: string, body: UpdateAddressDto): Promise<AddressEntity> {
    await this.findById(id, body.petshopId);

    try {
      return this.addressRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar o endereço, verifique as informações enviadas!',
      );
    }
  }

  async delete(id: string, petshopId: string): Promise<AddressEntity> {
    await this.findById(id, petshopId);

    try {
      return this.addressRepository.delete(id, petshopId);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao excluir o endereço, verifique as informações enviadas!',
      );
    }
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<AddressDto>> {
    const { data, ...rest } = await this.addressRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(add => new AddressDto(add)) : [],
    };
  }
}
