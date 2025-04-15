import { Module } from '@nestjs/common';
import { VariationImageService } from './variation-image.service';
import { FileModule } from '../file/file.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [FileModule],
  providers: [VariationImageService, PrismaService],
  exports: [VariationImageService],
})
export class VariationImageModule {}
