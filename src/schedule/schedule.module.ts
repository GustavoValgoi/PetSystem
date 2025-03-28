import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { PetModule } from '../pet/pet.module';
import { ScheduleRepository } from './repositories/schedule.repository';

@Module({
  imports: [JwtModule, UserModule, PetModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository, PrismaService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
