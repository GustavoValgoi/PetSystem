import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VariationRepository } from './repositories/variation.repository';
import { VariationEntity } from './entities/variation.entity';
import { CreateVariationDto } from './dtos/create.dto';
import { UpdateVariationDto } from './dtos/update.dto';
import { VariationDto } from './dtos/variation.dto';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { ProductService } from '../product/product.service';

@Injectable()
export class VariationService {
  constructor(
    private readonly variationRepository: VariationRepository,
    private readonly productService: ProductService,
  ) {}

  async findById(id: string, productId: string): Promise<VariationEntity> {
    const variation = await this.variationRepository.findById(id, productId);

    if (!variation) {
      throw new NotFoundException('Variação de produto não encotrada!');
    }

    return variation;
  }

  async delete(id: string, productId: string): Promise<VariationEntity> {
    await this.findById(id, productId);

    try {
      return this.variationRepository.delete(id, productId);
    } catch {
      throw new BadRequestException('Houve um problema ao excluir a variação!');
    }
  }

  async create(body: CreateVariationDto): Promise<VariationEntity> {
    const { petshopId, ...data } = body;

    await this.productService.findById(data.productId, petshopId);

    try {
      return this.variationRepository.create(data);
    } catch {
      throw new BadRequestException('Houve um problema ao criar a variação!');
    }
  }

  async update(id: string, body: UpdateVariationDto): Promise<VariationEntity> {
    const { petshopId, ...data } = body;

    await this.productService.findById(data.productId, petshopId);
    await this.findById(id, data.productId);

    try {
      return this.variationRepository.update(id, data);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar a variação!',
      );
    }
  }

  async findAll(
    productId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<VariationDto>> {
    const { data, ...rest } = await this.variationRepository.findAll(
      productId,
      {
        limit: Number(query.limit) || 10,
        page: Number(query.page) || 1,
      },
    );

    return {
      ...rest,
      data: data.length ? data.map(v => new VariationDto(v)) : [],
    };
  }
}
