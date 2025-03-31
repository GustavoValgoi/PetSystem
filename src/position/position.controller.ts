import { Controller, UseGuards } from '@nestjs/common';
import { PositionService } from './position.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}
}
