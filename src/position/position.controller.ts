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
import { PositionService } from './position.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { PetshopID } from '../decorators/petshopid.decorator';
import { PositionDto } from './dtos/position.dto';
import { CreateUpdatePositionDto } from './dtos/create-update.dto';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(
    @Body() body: CreateUpdatePositionDto,
    @PetshopID() petshopId: string,
  ): Promise<PositionDto> {
    return new PositionDto(
      await this.positionService.create({ ...body, petshopId }),
    );
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<PositionDto>> {
    return this.positionService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<PositionDto> {
    return new PositionDto(await this.positionService.findById(id, petshopId));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
    @Body() body: CreateUpdatePositionDto,
  ): Promise<PositionDto> {
    return new PositionDto(
      await this.positionService.update(id, { ...body, petshopId }),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<PositionDto> {
    return new PositionDto(await this.positionService.delete(id, petshopId));
  }
}
