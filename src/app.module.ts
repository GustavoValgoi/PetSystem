import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PetshopModule } from './petshop/petshop.module';
import { FileModule } from './file/file.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { PetModule } from './pet/pet.module';
import { PositionModule } from './position/position.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';
import { BreedModule } from './breed/breed.module';
import { SpecieModule } from './specie/specie.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AttributeModule } from './attribute/attribute.module';
import { AttributeItemModule } from './attribute-item/attribute-item.module';
import { VariationAttributeModule } from './variation-attribute/variation-attribute.module';
import { VariationModule } from './variation/variation.module';
import { ProductModule } from './product/product.module';
import { CategoryProductModule } from './category-product/category-product.module';
import { VariationImageModule } from './variation-image/variation-image.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule,
    UserModule,
    AuthModule,
    PetshopModule,
    FileModule,
    EmployeeModule,
    CustomerModule,
    PetModule,
    PositionModule,
    TaskModule,
    CategoryModule,
    AddressModule,
    BreedModule,
    SpecieModule,
    ScheduleModule,
    AttributeModule,
    AttributeItemModule,
    VariationAttributeModule,
    VariationModule,
    ProductModule,
    CategoryProductModule,
    VariationImageModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
