import { Injectable } from '@nestjs/common';
import { AttributeRepository } from './repositories/attribute.repository';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeRepository: AttributeRepository) {}
}
