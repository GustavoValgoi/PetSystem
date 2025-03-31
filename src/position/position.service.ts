import { Injectable } from '@nestjs/common';
import { PositionRepository } from './repositories/position.repository';

@Injectable()
export class PositionService {
  constructor(private readonly positionRepository: PositionRepository) {}
}
