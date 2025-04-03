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
import { ScheduleService } from './schedule.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { CreateScheduleDto } from './dto/create.dto';
import { ScheduleDto } from './dto/schedule.dto';
import { PetshopID } from '../decorators/petshopid.decorator';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async create(
    @Body() body: CreateScheduleDto,
    @PetshopID() petshopId: string,
  ): Promise<ScheduleDto> {
    return new ScheduleDto(
      await this.scheduleService.create({ ...body, petshopId }),
    );
  }

  @Get()
  async findAll(
    @PetshopID() petshopId: string,
    @Query() query: IQueryPagination,
  ): Promise<IFindPagination<ScheduleDto>> {
    return this.scheduleService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<ScheduleDto> {
    return new ScheduleDto(await this.scheduleService.findById(id, petshopId));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CreateScheduleDto,
    @PetshopID() petshopId: string,
  ): Promise<ScheduleDto> {
    return new ScheduleDto(
      await this.scheduleService.update(id, { ...body, petshopId }),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<ScheduleDto> {
    return new ScheduleDto(await this.scheduleService.delete(id, petshopId));
  }
}
