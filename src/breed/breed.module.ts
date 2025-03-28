import { Module } from '@nestjs/common';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { BreedRepository } from './repositories/breed.repository';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [BreedController],
  providers: [BreedService, BreedRepository, PrismaService],
  exports: [BreedService],
})
export class BreedModule {}
