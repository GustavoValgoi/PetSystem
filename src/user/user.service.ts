import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.getById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  async updatePetshopId(
    userId: string,
    petshopId: string,
  ): Promise<UserEntity> {
    await this.findById(userId);

    return this.userRepository.update(userId, { petshopId });
  }
}
