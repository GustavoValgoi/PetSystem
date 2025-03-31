import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { PositionRepository } from './repositories/position.repository';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [PositionController],
  providers: [PositionService, PositionRepository, PrismaService],
  exports: [PositionService],
})
export class PositionModule {}
