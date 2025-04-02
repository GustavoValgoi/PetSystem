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
import { AttributeService } from './attribute.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { CreateUpdateAttributeDto } from './dtos/create-update.dto';
import { AttributeDto } from './dtos/attribute.dto';
import { PetshopID } from '../decorators/petshopid.decorator';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  async create(
    @Body() body: CreateUpdateAttributeDto,
    @PetshopID() petshopId: string,
  ): Promise<AttributeDto> {
    return new AttributeDto(
      await this.attributeService.create({ ...body, petshopId }),
    );
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<AttributeDto>> {
    return this.attributeService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<AttributeDto> {
    return new AttributeDto(
      await this.attributeService.findById(id, petshopId),
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
    @Body() body: CreateUpdateAttributeDto,
  ): Promise<AttributeDto> {
    return new AttributeDto(
      await this.attributeService.update(id, { ...body, petshopId }),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<AttributeDto> {
    return new AttributeDto(await this.attributeService.delete(id, petshopId));
  }
}
