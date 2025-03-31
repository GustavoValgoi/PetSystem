import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repositories/category.repository';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule {}
