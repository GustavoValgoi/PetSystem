import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './repositories/customer.repository';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, PrismaService],
  exports: [CustomerService],
})
export class CustomerModule {}
