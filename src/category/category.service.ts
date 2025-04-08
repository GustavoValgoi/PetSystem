import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryEntity } from './entities/category.entity';
import { CategoryDto } from './dtos/category.dto';
import { CreateCategoryDto } from './dtos/create.dto';
import { FileService } from '../file/file.service';
import { ImageFolderName } from '../file/enums/image-folder-name.enum';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { UpdateCategoryDto } from './dtos/update.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly fileService: FileService,
  ) {}

  async findById(id: string, petshopId: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(id, petshopId);

    if (!category) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    return category;
  }

  async create(
    body: CreateCategoryDto,
    image?: Express.Multer.File,
  ): Promise<CategoryEntity> {
    try {
      if (image) {
        const { imageName } = await this.fileService.uploadPhoto(
          body.petshopId,
          ImageFolderName.CATEGORY,
          image,
        );

        if (imageName) {
          body.image = imageName;
        }
      }

      return this.categoryRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao cadastrar a categoria, por favor verifique os dados!',
      );
    }
  }

  async update(
    id: string,
    body: UpdateCategoryDto,
    image?: Express.Multer.File,
  ): Promise<CategoryEntity> {
    const category = await this.findById(id, body.petshopId);

    try {
      if (image) {
        if (category.image) {
          const { imageName } = await this.fileService.updatePhoto(
            body.petshopId,
            category.image,
            ImageFolderName.CATEGORY,
            image,
          );

          if (imageName) {
            body.image = imageName;
          }
        } else {
          const { imageName } = await this.fileService.uploadPhoto(
            body.petshopId,
            ImageFolderName.CATEGORY,
            image,
          );

          if (imageName) {
            body.image = imageName;
          }
        }
      }

      return this.categoryRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar a categoria, por favor verifique os dados!',
      );
    }
  }

  async delete(id: string, petshopId: string): Promise<CategoryEntity> {
    await this.findById(id, petshopId);

    try {
      return this.categoryRepository.delete(id, petshopId);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao excluir a categoria, por favor verifique os dados!',
      );
    }
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<CategoryDto>> {
    const { data, ...rest } = await this.categoryRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(cat => new CategoryDto(cat)) : [],
    };
  }
}
