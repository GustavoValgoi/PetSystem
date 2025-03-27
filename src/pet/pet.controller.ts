import { FileInterceptor } from '@nestjs/platform-express';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { PetService } from './pet.service';
import { CreatePetDto } from './dtos/create.dto';
import { PetEntity } from './entities/pet.entity';
import { PetshopID } from '../decorators/petshopid.decorator';
import { FileValidationPipe } from '../pipes/file-validation.pipe';
import { IQueryPagination } from 'src/interfaces/query-pagination.interface';
import { IFindPagination } from 'src/interfaces/pagination.interface';
import { PetDto } from './dtos/pet.dto';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreatePetDto,
    @PetshopID() petshopId: string,
    @UploadedFile(FileValidationPipe) image?: Express.Multer.File,
  ): Promise<PetEntity> {
    return this.petService.create(body, petshopId, image);
  }

  @Get()
  async findAll(
    @Query() query: IQueryPagination,
    @PetshopID() petshopId: string,
  ): Promise<IFindPagination<PetDto>> {
    return this.petService.findAll(petshopId, query);
  }
}
