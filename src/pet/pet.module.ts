import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { PrismaService } from '../prisma/prisma.service';
import { PetRepository } from './repositories/pet.repository';
import { BreedModule } from '../breed/breed.module';
import { SpecieModule } from '../specie/specie.module';

@Module({
  imports: [JwtModule, UserModule, FileModule, BreedModule, SpecieModule],
  controllers: [PetController],
  providers: [PetService, PetRepository, PrismaService],
  exports: [PetService],
})
export class PetModule {}
