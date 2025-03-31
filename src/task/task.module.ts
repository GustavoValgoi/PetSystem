import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma/prisma.service';
import { TaskRepository } from './repositories/task.repository';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}
