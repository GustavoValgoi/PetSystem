import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { PetshopID } from '../decorators/petshopid.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { BreedService } from './breed.service';
import { BreedDto } from './dtos/breed.dto';
import { CreateBreedDto } from './dtos/create.dto';
import { IFindPagination } from 'src/interfaces/pagination.interface';
import { IQueryPagination } from 'src/interfaces/query-pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  async create(
    @Body() body: CreateBreedDto,
    @PetshopID() petshopId: string,
  ): Promise<BreedDto> {
    return new BreedDto(await this.breedService.create(body, petshopId));
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<BreedDto>> {
    return this.breedService.findAll(query, petshopId);
  }
}
