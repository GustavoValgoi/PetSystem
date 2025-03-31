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
import { SpecieDto } from './dtos/specie.dto';
import { SpecieService } from './specie.service';
import { CreateUpdateSpecieDto } from './dtos/create-update.dto';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { PetshopID } from '../decorators/petshopid.decorator';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('specie')
export class SpecieController {
  constructor(private readonly specieService: SpecieService) {}

  @Post()
  async create(
    @Body() body: CreateUpdateSpecieDto,
    @PetshopID() petshopId: string,
  ): Promise<SpecieDto> {
    return new SpecieDto(
      await this.specieService.create({ ...body, petshopId }),
    );
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<SpecieDto>> {
    return this.specieService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<SpecieDto> {
    return new SpecieDto(await this.specieService.findById(id, petshopId));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateUpdateSpecieDto,
    @PetshopID() petshopId: string,
  ): Promise<SpecieDto> {
    return new SpecieDto(
      await this.specieService.update(id, { ...body, petshopId }),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<SpecieDto> {
    return new SpecieDto(await this.specieService.delete(id, petshopId));
  }
}
