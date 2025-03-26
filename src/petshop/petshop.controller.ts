import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PetshopService } from './petshop.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePetshopDto } from './dtos/create.dto';
import { FileValidationPipe } from '../pipes/file-validation.pipe';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { UserParam } from '../decorators/user.decorator';
import { UserDto } from '../user/dtos/user.dto';

@Roles(RoleEnum.LEVEL_1)
@UseGuards(AuthGuard, RoleGuard)
@Controller('petshop')
export class PetshopController {
  constructor(private readonly petshopService: PetshopService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreatePetshopDto,
    @UserParam() user: UserDto,
    @UploadedFile(FileValidationPipe) image?: Express.Multer.File,
  ) {
    return this.petshopService.create(body, user, image);
  }
}
