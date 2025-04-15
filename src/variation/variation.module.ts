import { Module } from '@nestjs/common';
import { VariationController } from './variation.controller';
import { VariationService } from './variation.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { VariationRepository } from './repositories/variation.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [JwtModule, UserModule, ProductModule],
  controllers: [VariationController],
  providers: [VariationService, VariationRepository, PrismaService],
  exports: [VariationService],
})
export class VariationModule {}
