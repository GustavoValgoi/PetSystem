import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AttributeItemService } from './attribute-item.service';
import { CreateUpdateAttributeItemDto } from './dtos/create-update.dto';
import { AttributeItemDto } from './dtos/attribute-item.dto';
import { PetshopID } from '../decorators/petshopid.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleEnum.LEVEL_1, RoleEnum.LEVEL_2)
@Controller('attribute-item')
export class AttributeItemController {
  constructor(private readonly attributeItemService: AttributeItemService) {}

  @Post()
  async create(
    @Body() body: CreateUpdateAttributeItemDto,
  ): Promise<AttributeItemDto> {
    return new AttributeItemDto(await this.attributeItemService.create(body));
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<AttributeItemDto> {
    return new AttributeItemDto(
      await this.attributeItemService.findById(id, petshopId),
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
    @Body() body: CreateUpdateAttributeItemDto,
  ): Promise<AttributeItemDto> {
    return new AttributeItemDto(
      await this.attributeItemService.update(id, petshopId, body),
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @PetshopID() petshopId: string,
  ): Promise<AttributeItemDto> {
    return new AttributeItemDto(
      await this.attributeItemService.delete(id, petshopId),
    );
  }
}
