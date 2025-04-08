import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CreateCategoryDto } from './dtos/create.dto';
import { PetshopID } from '../decorators/petshopid.decorator';
import { CategoryDto } from './dtos/category.dto';
import { CategoryService } from './category.service';
import { FileValidationPipe } from '../pipes/file-validation.pipe';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { UpdateCategoryDto } from './dtos/update.dto';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateCategoryDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image: Express.Multer.File,
  ): Promise<CategoryDto> {
    return new CategoryDto(
      await this.categoryService.create({ ...body, petshopId }, image),
    );
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<CategoryDto>> {
    return this.categoryService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<CategoryDto> {
    return new CategoryDto(await this.categoryService.findById(id, petshopId));
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
    @Body() body: UpdateCategoryDto,
    @UploadedFile(FileValidationPipe) image: Express.Multer.File,
  ): Promise<CategoryDto> {
    return new CategoryDto(
      await this.categoryService.update(id, { ...body, petshopId }, image),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<CategoryDto> {
    return new CategoryDto(await this.categoryService.delete(id, petshopId));
  }
}
