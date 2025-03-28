import { Module } from '@nestjs/common';
import { SpecieController } from './specie.controller';
import { SpecieService } from './specie.service';

@Module({
  controllers: [SpecieController],
  providers: [SpecieService]
})
export class SpecieModule {}
