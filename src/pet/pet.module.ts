import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { PrismaService } from '../prisma/prisma.service';
import { PetRepository } from './repositories/pet.repository';

@Module({
  imports: [JwtModule, UserModule, FileModule],
  controllers: [PetController],
  providers: [PetService, PetRepository, PrismaService],
  exports: [PetService],
})
export class PetModule {}
