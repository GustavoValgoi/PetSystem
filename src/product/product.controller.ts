import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create.dto';
import { PetshopID } from '../decorators/petshopid.decorator';
import { ProductDto } from './dtos/product.dto';
import { FileValidationPipe } from '../pipes/file-validation.pipe';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateProductDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image: Express.Multer.File,
  ): Promise<ProductDto> {
    return new ProductDto(
      await this.productService.create({ ...body, petshopId }, image),
    );
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<ProductDto> {
    return new ProductDto(await this.productService.findById(id, petshopId));
  }
}
