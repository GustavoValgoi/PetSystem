import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
    return this.employeeService.create(body, petshopId, image);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<EmployeeEntity> {
    return this.employeeService.findById(id, petshopId);
  }
}
