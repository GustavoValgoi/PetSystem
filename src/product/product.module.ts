import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './product.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { CategoryProductModule } from '../category-product/category-product.module';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryModule } from '../category/category.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    JwtModule,
    UserModule,
    CategoryModule,
    CategoryProductModule,
    FileModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
