import { Module } from '@nestjs/common';
import { PetshopController } from './petshop.controller';
import { PetshopService } from './petshop.service';
import { PetshopRepository } from './repositories/petshop.repository';
import { JwtModule } from '../jwt/jwt.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [JwtModule, UserModule, FileModule],
  controllers: [PetshopController],
  providers: [PetshopService, PrismaService, PetshopRepository],
  exports: [PetshopService],
})
export class PetshopModule {}
