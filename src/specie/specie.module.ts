import { Module } from '@nestjs/common';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { SpecieRepository } from './repositories/specie.repository';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [SpecieController],
  providers: [SpecieService, SpecieRepository, PrismaService],
  exports: [SpecieService],
})
export class SpecieModule {}
