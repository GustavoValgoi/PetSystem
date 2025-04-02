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
import { AddressService } from './address.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AddressDto } from './dtos/address.dto';
import { CreateAddressDto } from './dtos/create.dto';
import { UpdateAddressDto } from './dtos/update.dto';
import { IFindPagination } from '../interfaces/pagination.interface';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { PetshopID } from '../decorators/petshopid.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(
    @Body() body: CreateAddressDto,
    @PetshopID() petshopId: string,
  ): Promise<AddressDto> {
    return new AddressDto(
      await this.addressService.create({ ...body, petshopId }),
    );
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<AddressDto>> {
    return this.addressService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<AddressDto> {
    return new AddressDto(await this.addressService.findById(id, petshopId));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
    @Body() body: UpdateAddressDto,
  ): Promise<AddressDto> {
    return new AddressDto(
      await this.addressService.update(id, { ...body, petshopId }),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<AddressDto> {
    return new AddressDto(await this.addressService.delete(id, petshopId));
  }
}
