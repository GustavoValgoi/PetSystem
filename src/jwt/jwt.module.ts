import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as JwtModuleOriginal } from '@nestjs/jwt';

@Module({
  imports: [JwtModuleOriginal],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
