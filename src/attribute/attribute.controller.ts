import { Controller, UseGuards } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}
}
