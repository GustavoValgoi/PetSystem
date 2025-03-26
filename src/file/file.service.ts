import * as path from 'node:path';
import * as fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'node:fs/promises';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ImageFolderName } from './enums/image-folder-name.enum';

@Injectable()
export class FileService implements OnModuleInit {
  onModuleInit() {
    this.createFolder();
  }

  getDestinationPath(): string {
    return path.join(process.cwd(), 'uploads');
  }

  createFolder(petshopId?: string, folderName?: ImageFolderName) {
    if (folderName) {
      if (
        !fs.existsSync(
          this.getDestinationPath() + '/' + petshopId + '/' + folderName,
        )
      ) {
        fs.mkdirSync(
          this.getDestinationPath() + '/' + petshopId + '/' + folderName,
          { recursive: true },
        );
      }
    } else {
      if (!fs.existsSync(this.getDestinationPath())) {
        fs.mkdirSync(this.getDestinationPath());
      }
    }
  }

  removePhoto(
    petshopId: string,
    imageName: string,
    type: ImageFolderName,
  ): boolean {
    const path =
      this.getDestinationPath() + `/${petshopId}/${type}/${imageName}`;

    try {
      return this.removeFromStorage(path);
    } catch {
      throw new BadRequestException('Erro ao excluir a imagem!');
    }
  }

  async uploadPhoto(
    petshopId: string,
    type: ImageFolderName,
    file: Express.Multer.File,
  ): Promise<{ imageName: string; path: string }> {
    this.createFolder(petshopId, type);

    const pathImage = this.getDestinationPath() + `/${petshopId}/${type}`;

    try {
      const imgName = `${uuidv4()}-${file.originalname}`;
      const path = await this.sendToStorage(file, `${pathImage}/${imgName}`);

      return { imageName: imgName, path };
    } catch (e) {
      console.log('erro', e);
      throw new BadRequestException('Erro ao salvar a imagem!');
    }
  }

  async updatePhoto(
    petshopId: string,
    imageName: string,
    type: ImageFolderName,
    file: Express.Multer.File,
  ): Promise<{ imageName: string; path: string }> {
    try {
      const pathOldImage =
        this.getDestinationPath() + `/${petshopId}/${type}/${imageName}`;
      const pathImage = this.getDestinationPath() + `/${petshopId}/${type}`;

      this.removeFromStorage(pathOldImage);

      const imgName = `${uuidv4()}-${file.originalname}`;
      const path = await this.sendToStorage(file, `${pathImage}/${imgName}`);

      return { imageName: imgName, path };
    } catch {
      throw new BadRequestException('Erro ao atualizar a imagem!');
    }
  }

  async sendToStorage(
    file: Express.Multer.File,
    path: string,
  ): Promise<string> {
    await writeFile(path, file.buffer);
    return path;
  }

  removeFromStorage(path: string): boolean {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      return true;
    }
    return false;
  }
}
