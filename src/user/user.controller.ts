import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserParam } from '../decorators/user.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RootGuard } from '../guards/root.guard';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    return new UserDto(await this.userService.findById(id));
  }

  @Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
  @UseGuards(AuthGuard, RoleGuard, RootGuard)
  @Get()
  me(@UserParam() user: UserEntity): UserDto {
    return new UserDto(user);
  }
}
