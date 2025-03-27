import { Injectable } from '@nestjs/common';
import { PetRepository } from './repositories/pet.repository';
import { CreatePetDto } from './dtos/create.dto';
import { PetEntity } from './entities/pet.entity';
import { FileService } from '../file/file.service';
import { ImageFolderName } from '../file/enums/image-folder-name.enum';
import { IQueryPagination } from 'src/interfaces/query-pagination.interface';
import { IFindPagination } from 'src/interfaces/pagination.interface';
import { PetDto } from './dtos/pet.dto';

@Injectable()
export class PetService {
  constructor(
    private readonly petRepository: PetRepository,
    private readonly fileService: FileService,
  ) {}

  async create(
    body: CreatePetDto,
    petshopId: string,
    image?: Express.Multer.File,
  ): Promise<PetEntity> {
    if (image) {
      const { imageName } = await this.fileService.uploadPhoto(
        petshopId,
        ImageFolderName.PET,
        image,
      );

      if (imageName) {
        body.image = imageName;
      }
    }

    return this.petRepository.create({
      ...body,
      petshopId,
    });
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<PetDto>> {
    const { data, ...rest } = await this.petRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(pet => new PetDto(pet)) : [],
    };
  }
}
