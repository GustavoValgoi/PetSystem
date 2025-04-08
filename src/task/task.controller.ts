import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTaskDto } from './dtos/update.dto';
import { CreateTaskDto } from './dtos/create.dto';
import { TaskDto } from './dtos/task.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { TaskService } from './task.service';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { PetshopID } from '../decorators/petshopid.decorator';
import { FileValidationPipe } from '../pipes/file-validation.pipe';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateTaskDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image: Express.Multer.File,
  ): Promise<TaskDto> {
    return new TaskDto(
      await this.taskService.create({ ...body, petshopId }, image),
    );
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<TaskDto>> {
    return this.taskService.findAll(petshopId, query);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<TaskDto> {
    return new TaskDto(await this.taskService.findById(id, petshopId));
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<TaskDto> {
    return new TaskDto(await this.taskService.delete(id, petshopId));
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image: Express.Multer.File,
  ): Promise<TaskDto> {
    return new TaskDto(
      await this.taskService.update(id, { ...body, petshopId }, image),
    );
  }
}
