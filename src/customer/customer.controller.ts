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
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos/create.dto';
import { CustomerDto } from './dtos/customer.dto';
import { PetshopID } from '../decorators/petshopid.decorator';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { UpdateCustomerDto } from './dtos/update.dto';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body() body: CreateCustomerDto,
    @PetshopID() petshopId: string,
  ): Promise<CustomerDto> {
    return new CustomerDto(
      await this.customerService.create({ ...body, petshopId }),
    );
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<CustomerDto>> {
    return this.customerService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<CustomerDto> {
    return new CustomerDto(await this.customerService.findById(id, petshopId));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCustomerDto,
    @PetshopID() petshopId: string,
  ): Promise<CustomerDto> {
    return new CustomerDto(
      await this.customerService.update(id, { ...body, petshopId }),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<CustomerDto> {
    return new CustomerDto(await this.customerService.delete(id, petshopId));
  }
}
