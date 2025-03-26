import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file?: Express.Multer.File): Express.Multer.File | undefined {
    if (!file) {
      return undefined;
    }

    const typesFile = ['image/jpeg', 'image/jpg', 'image/png'];
    const sizeFile = 500000;

    if (file.size > sizeFile) {
      throw new BadRequestException('O tamanho do arquivo excede o permitido!');
    }
    if (!typesFile.some(t => t === file.mimetype)) {
      throw new BadRequestException('O tipo do arquivo é inválido!');
    }

    return file;
  }
}
