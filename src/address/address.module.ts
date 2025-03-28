import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressRepository } from './repositories/address.repository';
import { AddressService } from './address.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [JwtModule, UserModule, CustomerModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository, PrismaService],
  exports: [AddressService],
})
export class AddressModule {}
