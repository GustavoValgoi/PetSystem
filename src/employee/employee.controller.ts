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
import { EmployeeService } from './employee.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { CreateEmployeeDto } from './dtos/create.dto';
import { FileValidationPipe } from '../pipes/file-validation.pipe';
import { EmployeeEntity } from './entities/employee.entity';
import { PetshopID } from '../decorators/petshopid.decorator';
import { UpdateEmployeeDto } from './dtos/update.dto';
import { EmployeeDto } from './dtos/employee.dto';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateEmployeeDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image?: Express.Multer.File,
  ): Promise<EmployeeEntity> {
    return this.employeeService.create({ ...body, petshopId }, image);
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<EmployeeDto>> {
    return this.employeeService.findAll(petshopId, query);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() body: UpdateEmployeeDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image?: Express.Multer.File,
  ): Promise<EmployeeDto> {
    return new EmployeeDto(
      await this.employeeService.update(id, { ...body, petshopId }, image),
    );
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<EmployeeDto> {
    return new EmployeeDto(await this.employeeService.findById(id, petshopId));
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<EmployeeDto> {
    return new EmployeeDto(await this.employeeService.delete(id, petshopId));
  }
}
