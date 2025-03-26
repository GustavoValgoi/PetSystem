import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from './file.service';
import { FileRepository } from './repositories/file.repository';

@Module({
  providers: [FileService, FileRepository, PrismaService],
  exports: [FileService],
})
export class FileModule {}
