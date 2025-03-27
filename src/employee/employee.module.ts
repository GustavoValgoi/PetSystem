import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './repositories/employee.repository';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [JwtModule, UserModule, FileModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository, PrismaService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
