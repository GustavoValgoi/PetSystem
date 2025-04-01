import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dtos/create.dto';
import { ProductEntity } from './entities/product.entity';
import { CreateUpdateCategoryProductDto } from '../category-product/entities/create.dto';
import { CategoryProductService } from '../category-product/category-product.service';
import { FileService } from '../file/file.service';
import { ImageFolderName } from 'src/file/enums/image-folder-name.enum';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly categoryProductService: CategoryProductService,
    private readonly fileService: FileService,
  ) {}

  async findById(id: string, petshopId: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id, petshopId);

    if (!product) {
      throw new NotFoundException('Produto não encontrado!');
    }

    return product;
  }

  async create(
    body: CreateProductDto,
    image?: Express.Multer.File,
  ): Promise<ProductEntity> {
    const { categories, ...rest } = body;

    for (const category of categories) {
      await this.categoryService.findById(category.id, rest.petshopId);
    }

    try {
      if (image) {
        const { imageName } = await this.fileService.uploadPhoto(
          rest.petshopId,
          ImageFolderName.PRODUCT,
          image,
        );

        if (imageName) {
          rest.image = imageName;
        }
      }

      const product = await this.productRepository.create(rest);

      const catProdId: CreateUpdateCategoryProductDto[] = [];

      for (const category of categories) {
        catProdId.push({
          categoryId: category.id,
          productId: product.id,
        });
      }

      await this.categoryProductService.create(catProdId);

      return this.findById(product.id, rest.petshopId);
    } catch {
      throw new BadRequestException('Houve um problema ao criar o produto!');
    }
  }
}
