import { Controller, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
}
