import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttributeItemRepository {
  constructor(private readonly prisma: PrismaService) {}
}
