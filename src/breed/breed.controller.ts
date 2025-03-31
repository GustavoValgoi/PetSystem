import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedDto } from './dtos/breed.dto';
import { CreateUpdateBreedDto } from './dtos/create-update.dto';
import { Roles } from '../decorators/role.decorator';
import { PetshopID } from '../decorators/petshopid.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { IFindPagination } from '../interfaces/pagination.interface';
import { IQueryPagination } from '../interfaces/query-pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  async create(
    @PetshopID() petshopId: string,
    @Body() body: CreateUpdateBreedDto,
  ): Promise<BreedDto> {
    return new BreedDto(await this.breedService.create({ ...body, petshopId }));
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<BreedDto>> {
    return this.breedService.findAll(query, petshopId);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<BreedDto> {
    return new BreedDto(await this.breedService.findById(id, petshopId));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
    @Body() body: CreateUpdateBreedDto,
  ): Promise<BreedDto> {
    return new BreedDto(
      await this.breedService.update(id, { ...body, petshopId }),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<BreedDto> {
    return new BreedDto(await this.breedService.delete(id, petshopId));
  }
}
