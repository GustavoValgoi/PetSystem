import { Module } from '@nestjs/common';
import { AttributeItemController } from './attribute-item.controller';
import { AttributeItemService } from './attribute-item.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { AttributeItemRepository } from './repositories/attribute-item.repository';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [AttributeItemController],
  providers: [AttributeItemService, AttributeItemRepository, PrismaService],
  exports: [AttributeItemService],
})
export class AttributeItemModule {}
