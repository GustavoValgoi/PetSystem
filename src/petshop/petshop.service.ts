import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PetshopRepository } from './repositories/petshop.repository';
import { CreatePetshopDto } from './dtos/create.dto';
import { UserDto } from '../user/dtos/user.dto';
import { FileService } from '../file/file.service';
import { UserService } from '../user/user.service';
import { PetshopEntity } from './entities/petshop.entity';
import { ImageFolderName } from '../file/enums/image-folder-name.enum';
import { HttpAppError } from '../error/app.error';

@Injectable()
export class PetshopService {
  constructor(
    private readonly petshopRepository: PetshopRepository,
    private readonly fileService: FileService,
    private readonly userService: UserService,
  ) {}

  async findById(id: string): Promise<PetshopEntity> {
    const petshop = await this.petshopRepository.findById(id);

    if (!petshop) {
      throw new NotFoundException('Petshop não encontrado!');
    }

    return petshop;
  }

  async create(
    body: CreatePetshopDto,
    user: UserDto,
    image?: Express.Multer.File,
  ) {
    try {
      const userExits = await this.userService.findById(user.id);

      if (userExits.petshopId) {
        throw new UnauthorizedException(
          'Você já possui um petshop cadastrado!',
        );
      }

      const petshop = await this.petshopRepository.create(body);

      await this.userService.updatePetshopId(user.id, petshop.id);

      if (image) {
        const { imageName } = await this.fileService.uploadPhoto(
          petshop.id,
          ImageFolderName.PETSHOP,
          image,
        );

        return this.updateImage(petshop.id, imageName);
      }

      return petshop;
    } catch (error: unknown) {
      throw new HttpAppError(error);
    }
  }

  async updateImage(
    petshopId: string,
    imageName: string,
  ): Promise<PetshopEntity> {
    await this.findById(petshopId);

    return this.petshopRepository.update(petshopId, { image: imageName });
  }
}
