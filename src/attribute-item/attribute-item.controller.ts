import { Controller, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AttributeItemService } from './attribute-item.service';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('attribute-item')
export class AttributeItemController {
  constructor(private readonly attributeItemService: AttributeItemService) {}
}
