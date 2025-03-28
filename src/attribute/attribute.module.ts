import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { AttributeRepository } from './repositories/attribute.repository';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [AttributeController],
  providers: [AttributeService, AttributeRepository, PrismaService],
  exports: [AttributeService],
})
export class AttributeModule {}
