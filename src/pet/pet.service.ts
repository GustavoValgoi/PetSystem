import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PetRepository } from './repositories/pet.repository';
import { CreatePetDto } from './dtos/create.dto';
import { PetEntity } from './entities/pet.entity';
import { FileService } from '../file/file.service';
import { ImageFolderName } from '../file/enums/image-folder-name.enum';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';
import { PetDto } from './dtos/pet.dto';
import { UpdatePetDto } from './dtos/update.dto';
import { BreedService } from '../breed/breed.service';
import { SpecieService } from '../specie/specie.service';

@Injectable()
export class PetService {
  constructor(
    private readonly petRepository: PetRepository,
    private readonly fileService: FileService,
    private readonly breedService: BreedService,
    private readonly specieService: SpecieService,
  ) {}

  async findById(id: string, petshopId: string): Promise<PetEntity> {
    const pet = await this.petRepository.findById(id, petshopId);

    if (!pet) {
      throw new NotFoundException('Pet não encontrado!');
    }

    return pet;
  }

  async update(
    id: string,
    body: UpdatePetDto,
    image?: Express.Multer.File,
  ): Promise<PetEntity> {
    if (!body.petshopId) {
      throw new UnauthorizedException(
        'Você não possui permissão para atualizar esse Pet!',
      );
    }
    const pet = await this.findById(id, body.petshopId);

    if (body.breedId) {
      await this.breedService.findById(body.breedId, body.petshopId);
    }
    if (body.specieId) {
      await this.specieService.findById(body.specieId, body.petshopId);
    }

    try {
      if (image) {
        if (pet.image) {
          const { imageName } = await this.fileService.updatePhoto(
            body.petshopId,
            pet.image,
            ImageFolderName.PET,
            image,
          );

          if (imageName) {
            body.image = imageName;
          }
        } else {
          const { imageName } = await this.fileService.uploadPhoto(
            body.petshopId,
            ImageFolderName.PET,
            image,
          );

          if (imageName) {
            body.image = imageName;
          }
        }
      }

      return this.petRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao atualizar o Pet, por favor verifique todas as informações!',
      );
    }
  }

  async create(
    body: CreatePetDto,
    image?: Express.Multer.File,
  ): Promise<PetEntity> {
    try {
      if (image) {
        const { imageName } = await this.fileService.uploadPhoto(
          body.petshopId,
          ImageFolderName.PET,
          image,
        );

        if (imageName) {
          body.image = imageName;
        }
      }

      return this.petRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao cadastrar o Pet, por favor verifique todas as informações!',
      );
    }
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

  async delete(id: string, petshopId: string): Promise<PetEntity> {
    const pet = await this.findById(id, petshopId);

    await this.petRepository.delete(id, petshopId);

    if (pet.image) {
      this.fileService.removePhoto(petshopId, pet.image, ImageFolderName.PET);
    }

    return pet;
  }
}
