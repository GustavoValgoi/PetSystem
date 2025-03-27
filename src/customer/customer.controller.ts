import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos/create.dto';
import { PetshopID } from 'src/decorators/petshopid.decorator';
import { CustomerEntity } from './entities/customer.entity';

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
    return this.customerService.create(body, petshopId);
  }
}
