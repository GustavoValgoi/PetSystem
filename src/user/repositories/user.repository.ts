import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create.dto';
import { UpdateUserDto } from '../dtos/update.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async create(
    data: Omit<CreateUserDto, 'confirmPassword'>,
  ): Promise<UserEntity> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
