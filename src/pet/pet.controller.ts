import { FileInterceptor } from '@nestjs/platform-express';
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
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { PetService } from './pet.service';
import { CreatePetDto } from './dtos/create.dto';
import { PetshopID } from '../decorators/petshopid.decorator';
import { FileValidationPipe } from '../pipes/file-validation.pipe';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { PetDto } from './dtos/pet.dto';
import { UpdatePetDto } from './dtos/update.dto';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreatePetDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image?: Express.Multer.File,
  ): Promise<PetDto> {
    return new PetDto(
      await this.petService.create({ ...body, petshopId }, image),
    );
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<PetDto>> {
    return this.petService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<PetDto> {
    return new PetDto(await this.petService.findById(id, petshopId));
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<PetDto> {
    return new PetDto(await this.petService.delete(id, petshopId));
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePetDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image?: Express.Multer.File,
  ): Promise<PetDto> {
    return new PetDto(
      await this.petService.update(id, { ...body, petshopId }, image),
    );
  }
}
