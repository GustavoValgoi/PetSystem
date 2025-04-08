import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos/create.dto';
import { CustomerDto } from './dtos/customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { PetshopID } from '../decorators/petshopid.decorator';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body() body: CreateCustomerDto,
    @PetshopID() petshopId: string,
  ): Promise<CustomerEntity> {
    return this.customerService.create({ ...body, petshopId });
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<CustomerDto>> {
    return this.customerService.findAll(petshopId, query);
  }
}
